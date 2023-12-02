const express = require('express')
const app = express()
app.use(express.json())

const PORT  = 3001

const rooms = []
const bookings = []

//mainpage
app.get('/',(req,res)=>{
    res.send('<h1>Main Page</h1>')
})

//create room
app.post('/rooms',(req,res)=>{
    const {roomName,seats,amenities,pricePerHour} = req.body
    const room = {
        id:rooms.length+1,
        roomName,
        seats,
        amenities,
        pricePerHour
    }
    rooms.push(room)
    res.status(201).json(room)
})

//Book a room
app.post('/bookings',(req,res)=>{
    const {customerName,date,startTime,endTime,roomId} = req.body
    const room = rooms.find((r)=>r.id===roomId)
    if(!room){
        return res.status(400).json({error:'Room not available'})
    }
    const booking = {
        id:bookings.length+1,
        customerName,
        date,
        startTime,
        endTime,
        roomId
    }
    bookings.push(booking)
    res.status(201).json(booking)
})

//listing the rooms with booked data
app.get('/rooms/bookings',(req,res)=>{
    const roomBookings = bookings.map((booking)=>({
        roomName:booking.roomName,
        bookedStatus:'Booked',
        customerName:booking.customerName,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
    }))
    res.json(roomBookings)
})

// List all customers with booked Data
app.get('/customers/bookings', (req, res) => {
  const customerBookings = bookings.map((booking) => ({
    customerName: booking.customerName,
    roomName: booking.roomName,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));
  res.json(customerBookings);
});

// List how many times a customer has booked the room
app.get('/customer/bookings/:customerName', (req, res) => {
    const customerName= req.params.customerName;
    const customerBookings = bookings.filter(
      (booking) => booking.customerName === customerName
    );
    res.json(customerBookings);
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });