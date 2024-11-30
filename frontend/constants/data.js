// data.js
export const dummyDriverData = {
  name: "Prasant",
  vehicleNumber: "OD05BL6014",
  vehicleType: "Bajaj Maxima Z",
  rating: 4.75,
  image: "https://placehold.co/100x100", // Replace with actual driver image URL
  pin: [1, 1, 0, 1],
  eta: 5,
};

export const dummyRideData = {
  price: 484.25,
  paymentMethod: "Cash",
  cancellationFee: 25,
  locations: {
    pickup: {
      name: "Cmatrix Learning",
      address:
        "3D 575 Sector 8, Markat Nagar, behind Doctor Tonpe Road, CDA Sector 8, Cuttack, Odisha",
    },
    dropoff: {
      name: "The Presidency | Hotels In Bhubaneswar Near Kalinga Stadium",
      address:
        "1471/A, near ISKON Temple, ESIC Quarters, Nayapalli, Bhubaneswar, Odisha",
    },
  },
};

export const actionButtons = [
  {
    id: 1,
    name: "Safety",
    icon: "Shield",
  },
  {
    id: 2,
    name: "Share my trip",
    icon: "Share2",
  },
  {
    id: 3,
    name: "Call driver",
    icon: "Phone",
  },
];

export const cancelMessages = {
  title: "Cancel this ride?",
  description: "Cancellation fee of ₹25 may apply as per our policies",
  buttons: {
    confirm: "Yes, cancel ride",
    reject: "No, keep ride",
  },
};

export const sampleLocations = [
  {
    id: 1,
    name: "CMatrix Learning",
    address: "CDA Sector - 8, Cuttack",
    fullAddress:
      "behind Doctor Tonge Road, CDA Sector 8, Cuttack, Odisha, India",
  },
  {
    id: 2,
    name: "Ashwini Hospital",
    address: "CDA Sector - 6, Cuttack",
    fullAddress: "Kathajodi Ring Road, CDA Sector 6, Cuttack, Odisha",
  },
  {
    id: 3,
    name: "Biju Pattanaik Park",
    address: "CDA Sector - 13, Cuttack",
    fullAddress: "CDA Sector 13, Near Ring Road, Cuttack, Odisha",
  },
  {
    id: 4,
    name: "Kafla Colony",
    address: "Mathasahi, Cuttack",
    fullAddress: "Kafla Colony, Mathasahi Area, Cuttack, Odisha",
  },
];

export const rides = [
  {
    id: 1,
    name: "Connect Go",
    time: "3 mins away",
    price: 537.47,
    originalPrice: 584.21,
    description: "Affordable compact rides",
    icon: "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg",
  },
  {
    id: 2,
    name: "Premier",
    time: "1 min away",
    price: 644.86,
    originalPrice: 700.93,
    description: "Comfortable sedans, top-quality drivers",
    icon: "https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/package_UberComfort_new_2022.png",
  },
  {
    id: 3,
    name: "Connect Moto",
    time: "3 mins away",
    price: 130.11,
    originalPrice: 198.93,
    description: "Affordable, motorcycle rides",
    icon: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
  },
  {
    id: 4,
    name: "Connect Auto",
    time: "5 mins away",
    price: 236.28,
    originalPrice: 306.86,
    description: "No bargaining, doorstep pick-up",
    icon: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
  },
];

export const activeRideData = {
  driver: {
    name: "Rahul Kumar",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400",
    phone: "+91 98765 43210",
    vehicleNumber: "KA 01 AB 1234",
    vehicleModel: "Honda City",
    vehicleColor: "White",
  },
  trip: {
    pickup: "Indiranagar Metro Station",
    dropoff: "Koramangala 5th Block",
    distance: "5.2 km",
    duration: "22 mins",
    fare: 249,
    status: "ongoing", // can be 'arriving', 'ongoing', 'completed'
    eta: "12:45 PM",
  },
  paymentOptions: [
    {
      id: "cash",
      name: "Cash",
      icon: "💵",
    },
    {
      id: "upi",
      name: "UPI",
      icon: "📱",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: "💳",
    },
  ],
};

export const captainStats = {
  totalHours: 10.2,
  totalDistance: 30,
  totalJobs: 20,
  earnings: 325.0,
  name: "Jeremiah Curtis",
};

export const activeRideRequest = {
  passenger: {
    name: "Esther Berry",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    paymentMethod: "ApplePay",
    hasDiscount: true,
  },
  ride: {
    fare: 25.0,
    distance: 2.2,
    pickup: {
      address: "7958 Swift Village",
      coordinates: [40.7128, -74.006], // Example coordinates
    },
    dropoff: {
      address: "105 William St, Chicago, US",
      coordinates: [40.7138, -74.007], // Example coordinates
    },
  },
  mapImage: "https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif",
};

export const rideRequests = [
  {
    id: 1,
    passenger: {
      name: "Esther Berry",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      paymentMethod: "ApplePay",
      hasDiscount: true,
    },
    ride: {
      fare: 25.0,
      distance: 2.2,
      pickup: "7958 Swift Village",
      dropoff: "105 William St, Chicago, US",
    },
  },
  {
    id: 2,
    passenger: {
      name: "Callie Greer",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      paymentMethod: "ApplePay",
      hasDiscount: true,
    },
    ride: {
      fare: 20.0,
      distance: 1.5,
      pickup: "62 Kobe Trafficway",
      dropoff: "280 Icie Park Suite 496",
    },
  },
  {
    id: 3,
    passenger: {
      name: "Earl Guerrero",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      paymentMethod: "ApplePay",
      hasDiscount: false,
    },
    ride: {
      fare: 10.0,
      distance: 0.5,
      pickup: "9965 Soledad Ports",
      dropoff: "742 Ridge Park Avenue",
    },
  },
];

export const rideDetails = {
  passenger: {
    name: "Esther Berry",
    image: "path/to/image.jpg",
    paymentMethod: "ApplePay",
    hasDiscount: true,
  },
  pickup: {
    address: "7958 Swift Village",
  },
  dropoff: {
    address: "105 William St, Chicago, US",
  },
  fare: 25.0,
  distance: "2.2",
  notes: "Lorem ipsum dolor sit amet...",
  payments: [
    { label: "Apple Pay", amount: 15.0 },
    { label: "Discount", amount: 10.0 },
    { label: "Paid amount", amount: 25.0 },
  ],
};
