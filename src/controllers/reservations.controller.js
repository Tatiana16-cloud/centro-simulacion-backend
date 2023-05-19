const Database = require('../database')

class ReservationController {
    async getAll(){
      try {
        const result = await Database.query('SELECT * FROM Reservation');
        return {result}
      } catch (error) {
        return {error}
      }
    }

    async getById(reservationId){
        try {
          const result = await Database.query('SELECT * FROM Reservation WHERE id = ?', reservationId);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async create (new_reservation) {
      try {
        const result = await Database.query('INSERT INTO Reservation SET ?', new_reservation);
        return {result}
      } catch (error) {
        return {error}
      }
    }

      
    async update (reservationId, updatedReservation) {
        try {
          const result = await Database.query('UPDATE Reservation SET ? WHERE id = ?', [updatedReservation, reservationId]);
          return {result}
        } catch (error) {
          return {error}
        }
    }

    async delete (reservationId) {
        try {
          const result = await Database.query('DELETE FROM Reservation WHERE id = ?', reservationId);
          return {result}
        } catch (error) {
          return {error}
        }
    }
}

module.exports = ReservationController;