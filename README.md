TODO:

1. after creating a ride we need to send a request to the driver to acceept the ride or reject the ride, if one of the driver accepts the ride then automalloty for other driver the notification/message should not be sent.

2. Capatin Context API data should be visible in the UI once the rider is logged in currenltu we are using dummy data for the capatin context API.

3. Live tracking of the ride should be visible in the UI.

4. Driver Got a request to accept or reject the ride. but after accepting the ride the page become blank.
5. For the User Side still it's searching which shouls not be the case right?

THis is the response i got

```
{
"status": "success",
"message": "Ride created successfully",
"data": {
"ride": {
"user": "6747ec17be7778f08f11aca5",
"pickup": "Cmatrix Learning, behind Doctor Tonpe Road, CDA Sector 8, Cuttack, Odisha, India",
"destination": "Bhubaneswar Airport, Airport Road, Aerodrome Area, Bhubaneswar, Odisha, India",
"fare": 648,
"status": "pending",
"otp": "9762",
"\_id": "676305903c24700d1919db9e",
"\_\_v": 0
}
}
```

6. When the driver (pagar) login in i should see his details instead of dummy data.
   "paragdriver@example.com"
   if we dont have any details we can show it as N/A.

rizon11#

```
{
    "status": "success",
    "message": "Captain logged in successfully",
    "data": {
        "captain": {
            "fullName": {
                "firstName": "parag",
                "lastName": "driver"
            },
            "vehicle": {
                "color": "Black",
                "plate": "B4A1X9",
                "capacity": 4,
                "vehicleType": "car"
            },
            "_id": "67642bb2c90834c0325d56e2",
            "email": "paragdriver@example.com",
            "status": "inactive",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzY0MmJiMmM5MDgzNGMwMzI1ZDU2ZTIiLCJpYXQiOjE3MzQ2MTgxNzEsImV4cCI6MTczNDcwNDU3MX0.myJ_Qg70niLK1NY0l7zF7tG8th_eJjBhcmIs_6fVgr8"
    }
}
```
