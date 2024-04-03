import moment from 'moment';
import {
  getAllRoomTypes,
  getBookedRoomByHotelIdAndRoomTypeId,
  getBookedRoomsByStartDateAndEndDate,
  getRoomTypeByName,
  getRoomTypeMappingByHotelIdAndRoomTypeId,
} from '../service/api';
import { Alert } from 'react-native';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../service/firebase';
import 'moment/locale/tr';

moment.locale('tr');

export const handleReservation = async (
  hotelId,
  selectedRooms,
  reservationDateSelect,
  reservationPeopleCount,
  userId,
  navigation
) => {
  if (
    !reservationDateSelect.endDate ||
    selectedRooms.length === 0 ||
    reservationPeopleCount.reservationAdultCount === 0
  ) {
    Alert.alert('Uyarı', 'Lütfen oda, tarih ve kişi seçimi yapınız.', [
      { text: 'TAMAM' },
    ]);
    return;
  }

  let updatedRoomTypes = [];

  for (const selectedRoom of selectedRooms) {
    const roomType = await getRoomTypeByName(selectedRoom.split('-')[1].trim());
    updatedRoomTypes.push({ ...roomType, HotelId: hotelId });
  }

  let updatedMapping = [];
  let updatedBookedRooms = [];

  for (const mapping of updatedRoomTypes) {
    const typeMapping = await getRoomTypeMappingByHotelIdAndRoomTypeId(
      mapping.HotelId,
      mapping.id
    );
    updatedMapping.push(typeMapping);

    const bookedRoom = await getBookedRoomByHotelIdAndRoomTypeId(
      mapping.HotelId,
      mapping.id
    );
    if (bookedRoom) {
      updatedBookedRooms.push(...bookedRoom);
    }
  }

  const RoomTypes = await getAllRoomTypes();
  
  const PersonsMapping = {};
  RoomTypes.forEach((room) => {
    PersonsMapping[room.id] = room.RoomName;
  });
  
  let PersonsRooms = {};
  Object.values(PersonsMapping).forEach((roomName) => {
    PersonsRooms[roomName] = [];
  });
  
  updatedBookedRooms.forEach((room) => {
    const personsKey = PersonsMapping[room.RoomTypeId];
    if (personsKey) {
      PersonsRooms[personsKey].push(room);
    }
  });

  updatedBookedRooms.forEach((room) => {
    const personsKey = PersonsMapping[room.RoomTypeId];
    if (personsKey) {
      PersonsRooms[personsKey].push(room);
    }
  });

  let showAlert = true;

  updatedMapping.forEach(async (mapping, index) => {
    if (!showAlert) return;

    const personsKey = PersonsMapping[mapping.RoomTypeId];
    if (personsKey) {
      const roomCount = PersonsRooms[personsKey].length;

      const overlappingBookedRoom = updatedBookedRooms.find(
        (bookedRoom) =>
          bookedRoom.RoomTypeId === mapping.RoomTypeId &&
          ((moment(bookedRoom.StartDate).isSameOrBefore(
            reservationDateSelect.endDate
          ) &&
            moment(bookedRoom.EndDate).isSameOrAfter(
              reservationDateSelect.startDate
            )) ||
            moment(reservationDateSelect.startDate).isBetween(
              bookedRoom.StartDate,
              bookedRoom.EndDate,
              null,
              '[]'
            ) ||
            moment(reservationDateSelect.endDate).isBetween(
              bookedRoom.StartDate,
              bookedRoom.EndDate,
              null,
              '[]'
            ))
      );

      if (overlappingBookedRoom && roomCount > mapping.RoomCount) {
        Alert.alert(
          'Uyarı',
          'Seçtiğiniz oda tipinde istediğiniz tarihlerde boşluğumuz bulunmamaktadır.',
          [{ text: 'Tamam' }]
        );
        showAlert = false;
      } else {
        const existingReservation = await getBookedRoomsByStartDateAndEndDate(
          hotelId,
          userId,
          reservationDateSelect.startDate,
          reservationDateSelect.endDate
        );

        if (existingReservation.length === 0 && showAlert) {
          await addDoc(collection(db, 'bookedRoomes'), {
            AdultCount:
              reservationPeopleCount.reservationAdultCount +
              reservationPeopleCount.reservationChildCount,
            BabyCount: reservationPeopleCount.reservationBabyCount,
            EndDate: reservationDateSelect.endDate,
            HotelId: hotelId,
            RoomTypeId: mapping.RoomTypeId,
            StartDate: reservationDateSelect.startDate,
            UserId: userId,
            Status: 1,
          });
          if (index === updatedMapping.length - 1) {
            Alert.alert(
              'Başarılı',
              'Rezervasyonunuz başarıyla tamamlanmıştır.',
              [
                {
                  text: 'Tamam',
                  onPress: () => {
                    navigation.navigate('HomeScreen');
                  },
                },
              ]
            );
          }
        } else {
          if (index === updatedMapping.length - 1) {
            showAlert = false;
            Alert.alert(
              'Uyarı',
              'Bu otelde zaten bir rezervasyonunuz bulunmaktadır.',
              [{ text: 'Tamam' }]
            );
          }
        }
      }
    }
  });
};
