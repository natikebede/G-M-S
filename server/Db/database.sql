//////////////////////////////////////////
create table member(

  member_id bigserial primary key,
  fullname varchar(30) not null,
  age integer,
  gender varchar(15) not null,
  contact_number varchar(15) not null,
)
create table accounts(
  account_id bigserial primary key,
  username varchar(30) unique,
  password varchar(30) not null,
  role varchar (30) not null,
  status varchar (30) not null,
  created_date date not null
)

create table cashier(
  cashier_id bigserial primary key,
     account_id bigserial not null,
     emp_id bigserial not null,
      CONSTRAINT fk_account_ID
      FOREIGN KEY(account_id) 
	  REFERENCES accounts (account_id),
        CONSTRAINT fk_emp_ID
      FOREIGN KEY(emp_id) 
	  REFERENCES employee (emp_id)
)

create table membership(

    membership_id bigserial primary key,
    memebership_type varchar(30) not null,
     member_id bigserial not null ,
     start_date date not null,
     end_date date not null,
      status varchar(20) not null,
      registration_date date not null,
      cashier_id bigserial not null,

    CONSTRAINT fk_cashier_ID
      FOREIGN KEY(cashier_id) 
	  REFERENCES cashier (cashier_id),

     CONSTRAINT fk_memeber_ID
      FOREIGN KEY(member_id) 
	  REFERENCES member (member_id)
   

)

create table payment
(
  paymnet_id bigserial primary key,
  membership_id bigserial not null,
  cashier_id bigserial not null,
  amount decimal not null,
  payment_date date not null,
 payment_type varchar(30) not null,

  CONSTRAINT fk_cashier_ID
      FOREIGN KEY(cashier_id) 
	  REFERENCES cashier (cashier_id),

    CONSTRAINT fk_memebership_ID
      FOREIGN KEY(membership_id) 
	  REFERENCES membership (membership_id)

)
create table expense (

  expense_id bigserial primary key,
  amount decimal not null,
  reason varchar(150) not null,
  date date not null,
)

create table admin (

  admin_id bigserial primary key,
  account_id bigserial not null,
  emp_id bigserial not null,

    CONSTRAINT fk_emp_ID
      FOREIGN KEY(emp_id) 
	  REFERENCES employee (emp_id),

    CONSTRAINT fk_account_ID
      FOREIGN KEY(account_id) 
	  REFERENCES accounts (account_id)



)

create table employee
(

   emp_id bigserial primary key,
   fullname varchar(30) not null,
  contact_number varchar(15) not null,
    position varchar (30) not null,
    start_date date not null,
    sallery decimal not null,
    created_by bigserial not null,
    status varchar (30) not null,

      CONSTRAINT fk_account_ID
      FOREIGN KEY(created_by) 
	  REFERENCES accounts (account_id)
)