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
    role CHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Place (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255),
    max_capacity INT,
    location CHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Lab (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(255),
    location CHAR(255),
    equipments CHAR(255),
    PRIMARY KEY (id)
);