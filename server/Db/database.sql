create table Passenger (
 fullname varchar(50) not null,
 gender varchar(30) not null,
 passenge_ID bigserial primary key,
 contact_number varchar(30) not null);

 create table Driver (
 Driver_name varchar(50) not null,
 gender varchar(30) not null,
 Driver_ID bigserial primary key,
 Driver_dob date not null,
 Bus_ID bigserial ,
 CONSTRAINT fk_Bus_ID
      FOREIGN KEY(Bus_ID) 
	  REFERENCES Bus (bus_id)
 );

Create table cashier (
cashier_name varchar(50) not null,
gender varchar (30) not null,
username varchar (30) not null unique,
password varchar (30) not null,
cashier_ID  bigserial primary key);

ALTER TABLE driver
ADD CONSTRAINT constraint_bus
FOREIGN KEY (Bus_ID) 
REFERENCES Bus (bus_id)


create table Trips(
    Trip_id bigserial primary key,
    start_location varchar(50) not null,
    destination varchar(50) not null,
    price decimal not null,
    Leave_time time not null,
    trip_time time not null,
    Bus_ID bigserial not null,
    Bus_ID bigserial ,
 CONSTRAINT fk_Bus_ID
      FOREIGN KEY(Bus_ID) 
	  REFERENCES Bus (bus_id)
)

create table Reservation(
    reser_id bigserial primary key,
    pass_id bigserial not null,
    trip_id bigserial not null,
    reser_seat integer null,
    travel_date,date not null,
    pickup varchar(50) not null,
    reser_date date not null,
    cashier_id bigserial not null,
    payment_status varchar(30) default paid,

    CONSTRAINT fk_pass_ID
      FOREIGN KEY(pass_id) 
	  REFERENCES passenger (passenge_id),

    CONSTRAINT fk_trip_ID
      FOREIGN KEY(trip_id) 
	  REFERENCES trips (trip_id),

      CONSTRAINT fk_cashier_ID
      FOREIGN KEY(cashier_id) 
	  REFERENCES trips (cashier_id),

)