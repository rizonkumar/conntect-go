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
    icon: "🚗",
  },
  {
    id: 2,
    name: "Premier",
    time: "3 mins away",
    price: 644.86,
    originalPrice: 700.93,
    description: "Comfortable sedans, top-quality drivers",
    icon: "🚙",
  },
  {
    id: 3,
    name: "Connect Auto",
    time: "1 min away",
    price: 236.28,
    originalPrice: 306.86,
    description: "No bargaining, doorstep pick-up",
    icon: "🛺",
  },
];
