USE database_PIS3;

CREATE TABLE IF NOT EXISTS device (
    id INT NOT NULL AUTO_INCREMENT,
    deviceId INT,
    name CHAR(255),
    alias CHAR(255),
    brand CHAR(255),
    model CHAR(255),
    location CHAR(255),
    serial CHAR(255),
    responsable CHAR(255),
    type CHAR(255),
    license CHAR(255),
    Supplier INT,
    Support_supplier INT,
    purchase_date DATE,
    date_received DATE,
    commissioning_date DATE,
    warranty_expiration_date DATE,
    accessory_description TEXT,
    use_description TEXT,
    temperature CHAR(255),
    humidity CHAR(255),
    pressure CHAR(255),
    voltage CHAR(255),
    other TEXT,
    observation TEXT,
    image_url CHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Supplier (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255),
    phone_number CHAR(255),
    mail CHAR(255),
    address CHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Support (
    id INT NOT NULL AUTO_INCREMENT,
    device_id INT,
    responsable CHAR(255),
    date DATETIME,
    description TEXT,
    status CHAR(255),
    type CHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (device_id) REFERENCES device(id)
);

CREATE TABLE IF NOT EXISTS User (
    id INT NOT NULL AUTO_INCREMENT,
    username CHAR(255),
    password CHAR(255),
    name CHAR(255),
    last_name CHAR(255),
    document INT,
    ocupation CHAR(255),
    role INT,
    phone_number CHAR(255),
    mail CHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Place (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255),
    max_capacity INT,
    location CHAR(255),
    status INT,
    cod CHAR (255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Practice (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255),
    cod CHAR(255),
    devices CHAR(255),
    cod_place CHAR(255),
    affiliation CHAR(255),
    program CHAR(255),
    semester INT,
    PRIMARY KEY (id),
    FOREIGN KEY (cod_place) REFERENCES Place(id)
);

CREATE TABLE IF NOT EXISTS Reservation (
    id INT NOT NULL AUTO_INCREMENT,
    cod CHAR (255),
    cod_practice CHAR(255),
    participants INT NOT NULL,
    date DATE NOT NULL,
    responsible VARCHAR(255) NOT NULL,
    responsible_practice VARCHAR(255) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    activity VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    devices VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (id)
    -- FOREIGN KEY (cod_practice) REFERENCES Practice(id),
    -- FOREIGN KEY (responsable) REFERENCES User(id),
    -- FOREIGN KEY (responsable_practice) REFERENCES User(id)
);