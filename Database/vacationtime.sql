-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vacationtime
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `userRelation_idx` (`userId`),
  KEY `vacationRelation_idx` (`vacationId`),
  CONSTRAINT `userRelation` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vacationRelation` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (15,14),(15,71),(15,72),(15,73),(15,75),(15,77),(15,78),(15,79),(15,81),(15,82),(15,83),(16,14),(20,14),(21,14),(21,72),(21,73),(21,77),(21,78),(21,79),(21,80),(21,81),(21,82),(22,71),(22,72),(22,74),(22,75),(22,76),(22,77),(22,78),(22,79),(22,80),(22,81),(22,82),(22,83),(22,84),(23,71),(23,78),(23,81),(23,83),(24,14),(24,73),(24,78),(24,81),(25,14),(25,71),(25,72),(25,79),(25,80),(25,82),(26,14),(26,71),(26,82);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleRelation_idx` (`roleId`),
  CONSTRAINT `roleRelation` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'ee','2last','nassjmsede@gmail.com','5eb0b3b285ee931802f75f4cade4e7cdb0a88c798d8a746d84094c3d58a5db903b5b3491c383a7224ecf3f514af593bceae6b73857462fbd807cca713839e185',2),(5,'admin ','main','admin@gmail.com','41bc8b1fb0db8d0ad912ef3f462e78fc0fbc6dee653fc19f027a1696ca306e5f4c62d0e5ef9330469f3dd2e6ca7bd48e7fb681f02cf3b4c03ec489dda99206d4',1),(6,'Ohad','Gadassi','flimpto6nite@gmail.com','3e6e2ef2ff18f70829c9786a9f28fbdd8ee61d95d0b42e139ce59d8d64e12cf880affe234a101fb5241363005aead04a544a412ef83caa46d115bed1fe210581',2),(7,'Lior','Gadassi','aqlord08@gmail.com','7ccaa3f7d6be2dc9329c37de41eb6796055abe004ce0aa65eee858de489ab86eae154444aacc0cbcebac6496a0da53b4477e0061d1fb41956b68147cb377b306',2),(8,'Ohad','Gadassi','bar.rimoni.pr@gmail.com','63e655e74d45ca4f5cb8ebd4174ca5c43fc0d347c0fa666bbf211f8eb9f1d594835892417cb499353023d9e215744ed20213f02f416100da6c9c12169243e823',2),(10,'אוהד','גדסי','simpson@gmail.com','0bc3f5e899f6c018bf450e26d377f292443e6c3dddaef5ef97c26a280f85d2c0956cdfa68e81946c5ce3e3bc16989ae2572bcc043d46a99fcb83cb92ff1aca65',2),(11,'Ohad','Gadassi','shanibarrimoni@gmail.com','4a7ef1d229f6b24ee3a07a187c0b08cda7a655238864a00db540d03e7c9c06226f0de7f7690a22936d9495a66957cb9e83e2f0d5ad3672f5104d47fa1ad41397',2),(12,'Admin','Nistrator','lior.g55@gmail.com','c90f54248941c0be85f10dc7ffadb69b072522037575540b42f87973956d5a8e4e19d6987e1db758b49af5cf1de6ecf11cc2e7aeaa82f63fe3dbc488ffc3e703',1),(13,'אוהד','גדסי','aqlftord08@gmail.com','7ccaa3f7d6be2dc9329c37de41eb6796055abe004ce0aa65eee858de489ab86eae154444aacc0cbcebac6496a0da53b4477e0061d1fb41956b68147cb377b306',1),(14,'Ohad','Gadassi','aqlord008@gmail.com','7ccaa3f7d6be2dc9329c37de41eb6796055abe004ce0aa65eee858de489ab86eae154444aacc0cbcebac6496a0da53b4477e0061d1fb41956b68147cb377b306',1),(15,'User','Userman','user@gmail.com','267af32a481b5bd101b7a2ba383e4983a420d185451aacebd419e88b1528666e2232131302f7ce237d118700be8e419604b732add96e9838b34246b9bd4855e8',2),(16,'Ohad','Gadassi','OGAD@gmail.com','483e9f6d6b4dd1b8a0c13a8a9c95526c117201a533ee93761cdaa3d427b77c339bbe81c04c9ff67e1ec44e6c2273b54cab1baab69272274770e2a99bb3e1cd77',2),(17,'Ofir','Hasson','ofirhasson18@gmail.com','579622399e1d3eb015e137b596eadfbcf9921d71c8c90357506e4f882e1dc92f96d7acf93aa20fcb7b4bd39b9d57247100affe6133fba84bc43a38e3f6ce2720',2),(18,'Test','LastTest','Oxu56pNVyL@hotmail.com','c551ba5f262574c0223925cb2d765b539705376c931ce4e604ce18cc48f941c4bcd70af6b681c9b809a692821fb93a7fd537d8479d176800c1739c811acdb5cd',2),(19,'Lior','Gadassi','ogada1234ssi@gmail.com','579622399e1d3eb015e137b596eadfbcf9921d71c8c90357506e4f882e1dc92f96d7acf93aa20fcb7b4bd39b9d57247100affe6133fba84bc43a38e3f6ce2720',2),(20,'Adar','Ohayon','aqlord@gmail.com','59cb0778025ae84076dc324ec5f89a37b20b6750dd2987c2d8abb6f01af7a773169a79d4d25dd3d9e470539b225513de2d637dc512aeffcda35a7cebca28bfef',2),(21,'Adar','Ohayon','aqlore@gmail.com','e95e74bb2b9261ed8a035cc16b3e525f19a4fcb445e4431a283a77fcc4b6d5753e98e8b854c776b2101090c9f619b6debfee6fc2550345be5d38402327e04bb7',2),(22,'Ofek','Shlinger','ofekshlin@gmail.com','aa2161f76f82173f4444332b70dc645e67d6106fbd8b86df1303c4fa71d1400a391fbbf20a49dd16d9292f76c25e777590bc31237b9e4ced9f8a3bf2758dc084',2),(23,'Shani','Levi','shanilevi@gmail.com','b5f4b4d8c2aafe53da1876939005f386d3fac82eb683c924a18d4f4e5abb9f0d19b084e4743d970d9d7a9b672fe1a7f73a987cad6450699002be5e372a5edc21',2),(24,'Ohad','Gadassi','ogadassi@gmail.com','608aaea20099ba3679a2dd39c1acab9ac408ed9b7b1d38f20b4d620f8af1dcac8d871bc3547a9f5fb1525f3ec1f4b18054ee0720204a07ef4434ae4076973757',2),(25,'Omer','Shemer','omershemer113@gmail.com','749e744472af5c6b1a345a546f672f15f3e5de2c8db8f212b9509ce39f5ac83e57946b1816df7288a990b05af9d7dcc9302dfda400c22d261634858b4da728e9',2),(26,'\\b<div>\';DROP TABLE *\';%20$&nb','Ram','a@gmail.com','c90f54248941c0be85f10dc7ffadb69b072522037575540b42f87973956d5a8e4e19d6987e1db758b49af5cf1de6ecf11cc2e7aeaa82f63fe3dbc488ffc3e703',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(6,2) NOT NULL,
  `imageName` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (14,'Kyoto, Japan','Step back in time and experience the serenity of ancient temples and serene gardens in Kyoto, Japan. Wander through the Arashiyama Bamboo Grove, a mystical path lined with towering bamboo stalks. Explore the iconic Kinkaku-ji temple, the Golden Pavilion, and marvel at its shimmering beauty. Immerse yourself in the peaceful Zen gardens of Ryoan-ji temple and contemplate the raked sand and meticulously placed rocks. Discover the bustling Nishiki Market for a taste of local delicacies and explore the vibrant Gion district, the heart of geisha culture. Immerse yourself in the rich history and tranquil atmosphere of Kyoto.','2020-08-09','2020-08-16',2500.00,'954ed680-a863-49fc-8d5a-977e52e317e4.webp'),(71,'Bora Bora, Polynesia','Indulge in the ultimate tropical paradise getaway on the stunning island of Bora Bora. Relax in overwater bungalows with panoramic views of turquoise lagoons and lush greenery. Pamper yourself with rejuvenating spa treatments, snorkel in crystal-clear waters, and dine on gourmet cuisine.','2024-05-01','2024-05-04',2000.00,'b91519f0-acca-43b3-9c98-cf9cf41c9199.jpg'),(72,'Florence, Italy','Embark on a journey through the heart of Renaissance art and culture in the enchanting city of Florence. Explore iconic landmarks such as the Duomo, Uffizi Gallery, and Ponte Vecchio. Wander through cobblestone streets lined with historic palaces, indulge in Tuscan cuisine, and savor world-class wines.','2024-05-15','2024-05-30',3000.00,'faf7c1d4-9d39-42e8-b3eb-c00a16f992ec.webp'),(73,'Banff Park, Canada','Embark on an exhilarating wilderness adventure in the rugged beauty of Banff National Park. Explore towering mountains, turquoise lakes, and dense pine forests. Hike scenic trails, spot wildlife like elk and grizzly bears, and experience the awe-inspiring natural wonders of the Canadian Rockies.','2024-07-10','2024-07-20',1500.00,'4fc886b2-acf6-4bf0-879b-34209d60c56d.jpg'),(74,'Santorini, Greece','Escape to the breathtaking island of Santorini, where whitewashed buildings cling to cliffs overlooking the Aegean Sea. Explore charming villages with narrow cobblestone streets, iconic blue-domed churches, and spectacular sunsets. Indulge in Mediterranean cuisine, relax on black sand beaches, and immerse yourself in the romantic ambiance of this island paradise.','2025-04-10','2025-04-17',1800.00,'71323b40-baed-4c16-aba2-ee7fbebd8fb3.webp'),(75,'Serengeti, Tanzania','Embark on an unforgettable safari adventure in the vast wilderness of Serengeti National Park. Witness the iconic Great Migration, where millions of wildebeest and zebras traverse the savannah in search of greener pastures. Explore diverse ecosystems teeming with wildlife, from lions and elephants to giraffes and cheetahs. Experience luxury tented camps, thrilling game drives, and breathtaking sunsets over the African plains.','2024-08-05','2024-08-12',3300.00,'14b805b5-6ca6-448b-b252-f60bc82dccab.jpeg'),(76,'Petra, Jordan','Journey back in time to the ancient city of Petra, carved into the rose-colored cliffs of southern Jordan. Explore archaeological wonders such as the iconic Treasury, Monastery, and Royal Tombs. Wander through narrow siq passages, marvel at intricate rock-cut architecture, and uncover the secrets of this UNESCO World Heritage Site. Immerse yourself in the rich history and mystique of Petra\'s lost civilization.','2024-10-12','2024-10-15',2200.00,'1264c053-dd49-411d-b941-5f8492530e09.avif'),(77,'Costa Rica','Embark on a thrilling tropical adventure in the biodiversity hotspot of Costa Rica. Explore lush rainforests, misty cloud forests, and pristine beaches. Zip-line through the canopy, hike to cascading waterfalls, and spot exotic wildlife such as monkeys, sloths, and toucans. Immerse yourself in the pura vida lifestyle, relax in natural hot springs, and experience eco-friendly hospitality in this paradise.','2024-11-08','2024-11-15',1600.00,'5da2adb9-7a92-479e-a6c8-53d9583babd2.jpg'),(78,'Tromsø, Norway','Embark on a magical journey to Tromsø, the gateway to the Arctic, and witness the mesmerizing spectacle of the Northern Lights. Marvel at the dancing colors of the Aurora Borealis illuminating the dark winter skies. Explore snow-covered landscapes, go dog sledding through pristine wilderness, and warm up in cozy cabins with traditional Norwegian cuisine.','2025-01-20','2025-01-27',2600.00,'ee1d8360-8582-462c-8cdf-d809e2e13095.jpeg'),(79,'Machu Picchu, Peru','Embark on a journey to the ancient Inca citadel of Machu Picchu, nestled high in the Andes Mountains of Peru. Explore the mystical ruins, terraced hillsides, and stone temples of this UNESCO World Heritage Site. Hike the iconic Inca Trail or take a scenic train ride through the Sacred Valley. Immerse yourself in the rich history and breathtaking beauty of one of the world\'s most iconic archaeological sites.','2024-06-05','2024-06-12',2900.00,'17cc6354-dd35-4290-b37f-4cfb7031b63a.avif'),(80,'Maui, Hawaii','Escape to the lush paradise of Maui, Hawaii\'s second-largest island, known for its stunning beaches, volcanic landscapes, and vibrant culture. Relax on golden sands, snorkel in crystal-clear waters teeming with marine life, and hike through lush rainforests to cascading waterfalls. Experience traditional Hawaiian luau feasts, learn to surf on legendary waves, and witness unforgettable sunsets over the Pacific Ocean.','2024-06-10','2024-06-17',2300.00,'a71d4f9a-e661-4a68-8bc4-3e462d273ea9.jpg'),(81,'New York City, USA','Discover the iconic landmarks, cultural diversity, and endless excitement of New York City, the city that never sleeps. Explore world-famous attractions such as Times Square, Central Park, and the Statue of Liberty. Experience Broadway shows, world-class museums, and diverse culinary delights from around the globe. Immerse yourself in the vibrant energy and unique charm of the Big Apple.','2024-09-11','2024-09-18',1800.00,'de253360-0a21-46dc-849e-5c512af4652a.jpg'),(82,'Athens, Greece','Step back in time to ancient Greece with a journey to Athens, the cradle of Western civilization. Explore iconic landmarks such as the Acropolis, Parthenon, and Ancient Agora. Wander through charming Plaka streets lined with neoclassical buildings, sample traditional Greek cuisine, and immerse yourself in the rich history and mythology of this storied city.','2024-05-05','2024-05-12',2000.00,'1b7f4625-87d5-4aa8-bbec-7f48fb5d5791.jpg'),(83,'Phuket, Thailand','Relax and rejuvenate in the tropical paradise of Phuket, known for its stunning beaches, vibrant nightlife, and rich cultural heritage. Lounge on white sand beaches, snorkel in clear turquoise waters, and explore hidden coves by longtail boat. Discover Buddhist temples, savor authentic Thai cuisine, and experience the warm hospitality of the Land of Smiles.','2024-07-15','2024-07-22',1700.00,'c9d1b5b5-ef05-496b-8498-cec8f481d9cb.jpg'),(84,'Kruger, South Africa','Embark on a thrilling wildlife safari in the iconic Kruger National Park, home to an abundance of African wildlife. Set out on game drives to spot the Big Five—lion, elephant, buffalo, leopard, and rhinoceros—along with cheetahs, giraffes, and zebras. Stay in luxury lodges or rustic camps, dine under the stars, and experience the untamed beauty of the African bush.','2024-11-01','2024-11-08',3000.00,'d93fd10c-9aea-4edb-92f7-8c613c7ee268.jpg'),(85,'Hanoi, Vietnam','You know what a blind person can\'t enjoy in Vietnam? Hanoi!\r\nEmbark on a journey to Hanoi, Vietnam, where ancient traditions blend seamlessly with modernity, and vibrant streets teem with life and culture. A vacation in Hanoi promises an unforgettable experience, filled with sensory delights and enriching discoveries.\r\n\r\n','2024-09-08','2024-09-19',2000.00,'6a672a83-e4f8-4a3d-ba39-5264f5babf4e.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 22:01:11
