const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	const ingridients = [
		{
			id: 1,
			name: "Liście sałaty",
			category: "base",
			price: 2.0,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/39b1/1b5d/5675e4cbebdb421bb4423326b012ca02?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kTwFO8GAxxrmngM8~Qr6VYWpJU0zLOt2yCXPxnkB4UpGPTyqmUoU29eOS2W8VIR-m1vAntoPLUaUTW23LkNQiznTcYPcV8DR8~eZVX9wRjiC7niEvuUbSdo3ODdgvzR8mOagWvsi~93~NYgcVAg-rrfw~R~kXApIVERy8H1Ae7NxlCeSa9P0PI~8BY0wv2jVVvxzzox5nGKjQ-Ri11S8a6h2Pure4rpMyA-5usv7pGUDrrruSWNYyPbn8DXX9fZi2tovv-dXSB-gWq5U0MCatSrRU7Yo0MlRKXM3ip4cosjv7ISEmS7oCTXytimNlPFujdkbif1Y0~VZfzG4E9EuUA__",
		},
		{
			id: 2,
			name: "Rukola",
			category: "base",
			price: 3.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/8012/2666/97acf90dcd545045e6c5158608dff875?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=II0fTqjPjukhJOspPcJSURwNnd42cXo6PQbd26TyhZhBgonnt8P~F0Cgdm25Ciy2MVFKbqR301sv0oqla0kXH4VpDc20Vfw7tBT4kEXh0QDYpOKzaSiJ9zRho2Wfh0znY2gQmWSS329kIxMgd3WmeBNORAie92LKRpuGoKRQ40Ua4m2rG002uiOLZ1LoFqVgKy6rRePWfvU77scWiDDQPvSM4GFduQj2a46RWIhxz-sPTjLmNx8XNk0QL7EQs6XfzkHoynGrh2LBw1QXHL9hdq6hVdmOEuiGP463hy63c0s0yV4zRDceFnouKsW26DDvN91Og8WCSMeM6gLY137Pxw__",
		},
		{
			id: 3,
			name: "Szpinak",
			category: "base",
			price: 3.0,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/aa1b9c41734040b67535e33a7cd38d5b883c048b?fuid=951377600629151437",
		},
		{
			id: 4,
			name: "Mieszanka sałat",
			category: "base",
			price: 4.0,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/2a4e/cb9a/bc810d1a81647c5739212ab9fb275edd?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j7EpjGpMdZE7qTBqjVwlp~uY4kcjued4DO14lZwPUBTO5bIob7g4ezGij9PdEPVstuxWflDZsv~sDROOH0do0kIDV1joGk-OAhbDuraNqsDuN2jhmqKUOeg6DdzGcWdW~krNpAdJHdmDDYK-UA8zsvEKNtEsOiWRfifmH4~AAkGDPYj2uAA3owx9aYr8jlxCpqnN~EcR~4vQNwiiHGBEvK0x37zfh8sD8ypx7Af8nrj8OTQ87NM8o2iv4mYxtxFD1xRz0BCL6tNj-dsS42JhheJZkhiRUz4G7m7F0oEXxdzEc9EnMBmBNocEXltFvvFe3aM3-b5BSfmG5TU2POt-6w__",
		},
		{
			id: 5,
			name: "Makaron pełnoziarnisty",
			category: "base",
			price: 5.0,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/a8af/668a/840aabaa600dd29c96ec9044995c3569?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j5ZdMGcLUVcswEAANJcWuVPlmizli8sYl-ee55ZxVRCzTlSQjgSrNAUhgcW9TJi1GnIDvWydafVjHxn8Her-NVKShNIGqjNl7LJi9XXeFTtCn-jGge3I7U-kMLm9uY6klzzNqD5RXgubHIes-DcBCJAkuZSu8q15uuMer7pPtAUMcoB~t2ZehHmDysbyzxxuEXbbqKCRvoG1PbN-HjTAMUt~o44O2I3mLnpFKy1cM~91OEPUNrrzSO-PrkzTxap4n0jPr7~lKrO9USsfRazZ7QDxsWFGoxXlhu6l4sEv~Fg0ixygOpqeshMzvG~YTiPkyFE6bplxdrK0p5uJYvDChw__",
		},
		{
			id: 6,
			name: "Ryż basmanti",
			category: "base",
			price: 4.0,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/0f75/430c/2e0d3efbb1ff44fbdfbc275b677f9c9c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CZ57tMjLA8nzD~eUcdKMVW0s1ILLcgI3t4VVncARWYtACuMTFyszkgT-R9uUJfDjIn55fdq7VVmUzeK-MgY8namny2ReDU1HZVTSLAeahnv7oOkduorl1T2TsE9F3w2TFjsPyFaqcWiMu7muh5TpVBRU0JOqgFOZ~N99P9yEv1gMxSinzoIzbbFUKCa2du3nyYAwHmkm~e5HAfH8-ioZ~Wi-IZoJ0EDbz2QJvcX4Kt7j7veZ-1OOT~~esuwRzEOYxoLH2rTC6HfHQ0dh8qxvGy9j~um7FUQAOM8L76805inygUJQ9ZkW6dMcSzVEZE-MNPxdlq8QkEkx-G6Oadv3iw__",
		},
		{
			id: 7,
			name: "Jarmuż",
			category: "base",
			price: 6.75,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/eda68c14b3eb6a295aaa248ee7013b3265712fe7?fuid=951377600629151437",
		},
		{
			id: 8,
			name: "Pomidory",
			category: "vegetables",
			price: 3.25,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/d5bf45d1d9ed26081f70283ee2f821902cfae57d?fuid=951377600629151437",
		},
		{
			id: 9,
			name: "Ogórki",
			category: "vegetables",
			price: 2.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/8d38/d0d8/d7a78100af3068151eca2b86f074349e?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FIBU48AVAIhoHdiboK099zhltKkJatyucqattbcUFCXvZn1Eo4XwtxwCyhzF4lTv-KgtR2nMzORFN0vclIRRbiXaci3kLvOS~nG6QGAimu7qG0sw5CgEv34QD6p4elJynpUVzL8~WAU6iI7gQohcqoHnKVpoHFVsw4hdJ0zO1BvABYhd-Jq9mKdDgiQuGDyBYEsGsG7doxqmSmi0xf-2aaFsNdQlGActubk6U7RPm2wDWdGRAYiZxF0zGwCFgcdiGZxyZqTj0JhHxLTRiK~5dvktqeXcA2xF5EzTswTxoFDdghH6Bt3zC9-7gRgHhLksz4M-DMHm-PKdipPu3dUGRg__",
		},
		{
			id: 10,
			name: "Papryka czerwona",
			category: "vegetables",
			price: 4.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/018d/7020/e7a1b32df41e3096a681aa680c820ff7?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hnP5WVLQJGiDIom~dr5UIko0e8BTEZhmeAeb~nSuSvVC1-RZu2NN9H0svEfVjagUSn5ydyYtZgklqQJSE~0XP6Zmcpy07~KfqB1HEGAfsQsx-tnlYIx4XVbhcnfs5p~I7MEbtQR58PldNBCx9Ba1ukZbBI6zR~Klbsps91rGn7lBsprLiCCGgDnlBS1VCYqPbDydm7HUpX6Pyu21zuSwEUigcnfpL1BrJP~P68q-6dUgn7i5KVI5mhP9Q15Org0QzuDFPsYObCv38IkaMVWeQWzReO5XkT-cYPSjDBxBi4Gr4Q6VfGNJF2Q5wszIw-5h06pOWCwqzI9pEtn20gAH5g__",
		},
		{
			id: 11,
			name: "Marchewka",
			category: "vegetables",
			price: 2.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/f47e/c15f/3febb001d0c14ed6d4f9f6a5fa210b53?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PIF3hnHYl9va1dRaa29DgasHIU0VVm13Ew~xaLyYWCVRgW59qwOmaSMetb2XKF8znOkJg67vjaP-Yr14RqPbSmurw2aqo1-v3RBonngb7Ax5ctUBRSHKKcZDOEOvQCnQMOb7VtI0EkCa772n6P28GFgjb3oBBqMF4v~zTNbnVc3yQ6pJoaFSfWSzzg35kIMdaJax1twM3npPWMag5a9w~Uk5E6we7EG4IMO~JaKNwRxcT0Y~AsdR7q74uaCQ-a1v5BMecAVKqkhR81c3UZmZzJVGT3LCjmB-Oo~nx8APeAJFOLDIrSEOGpSiEgmHbSKm-QG~O-Rr340Ho3II3J8DMg__",
		},
		{
			id: 12,
			name: "Awokado",
			category: "vegetables",
			price: 5.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/3286/42bd/0dfb1f651c74bca34de772ac1e769f2e?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NPKVSQC9kckM61aPXkZXPrGnplXiozh3VVIMgmEWZQv1F6xyvtwprU6QczJKnOT3btAbnK6-mN6x-jVSANyc~Ig5Zxw0FrF8MLDR5L8LRIRGFszoh-U24a-BOpKuOCoMSYz3vlFI8IWtCXkDWpuHIf9efSviBRvjXTMwwAo9A4VMmFe5URUD2GanLt1HjiiHxp0BdjfuJLIPIh5adw3Xv3mOx14kMlKhkFDpDrqdZ-M92wt4MvvTPkqC1lasUOaq6xVh8JvznovHAYfqvMXWITxuy5UqRQbhKJXFvkkFwmqlntBmSZ8UJmIL9FDp0CdXZ8GrayhiAIyvB8fL6u7pzQ__",
		},
		{
			id: 13,
			name: "Czosnek",
			category: "vegetables",
			price: 1.5,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/713f3cd64befe4a905bfece53325d13978b71199?fuid=951377600629151437",
		},
		{
			id: 14,
			name: "Cebula czerwona",
			category: "vegetables",
			price: 2.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/3426/52fa/2f407dd5a3038c245fb629906c38736b?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XAhKtrwDeLk-Y43vpTMEb6xpRI~sN6drVdBMG25zq9-c0Uqm8D4C9Hmx1qQAN6O7Wo6y5vXOLeRYja33gLOBc5lqQNK7Q7bG0Fv2XktYBEZD54DPTlSVkHOb9k6kaAg3Wq4UAZVALjoU~OL8kqaEiPMUTH1XnzNMnyAr9jHUFi~7zVAL4IeqjVr2TCKRrqc~I2Y9yJLenFUStUb7qLNPBjX8GTVAN-lpH4-uLl7QjuJwwko4ee9xv9k0HorUxzKjowjVszjnTRH-qCmAfmlAceiyI9vmt1cJ68ZcsIGwbj5GOzUeTLnsr7TKgvcC462i1SpXxGYQ0yOFV7YPNyIqBw__",
		},
		{
			id: 15,
			name: "Jabłko",
			category: "vegetables",
			price: 2.25,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/be83/94fa/b485959eb97d1e4a72f423aeedc7ef3e?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PulxBDbPGtX39KVBy~bKxL8PEMOtFnLSs3fS55w34Eaaljir3qmlD~gGnI4zpqCiapNKf84CGlvY45GcNmhGNp4GooV75xXyeaZEtnTSVvR0MhwUIyWm5zSHAt3mk9hk64mzM9DVuNrcyoY07XwOr7jSiZ8IsEYWbHzRihTmCn3j4SivFJK9EaREC1h~NxapmYuJuwRk4FgGH6hdedP4~QrBzxJjWoRbA1HrqkIJPemw~h0VSTWiRHeKrS9zV3Y7ed76n~tgH2C3jh9uPuZYb3OoJwAvq~ByaaCXuY9lf8XK6na-U2X~~CS0fobRFKh6YiqKojjhf1KrPKRM5buaaQ__",
		},
		{
			id: 16,
			name: "Gruszka",
			category: "vegetables",
			price: 2.75,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/bd52b7981961b8c5c63927111d21c2be39b13224?fuid=951377600629151437",
		},
		{
			id: 17,
			name: "Granat",
			category: "vegetables",
			price: 5.5,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/cef48fb39cbb456ab69241caf3b41ad99ea80221?fuid=951377600629151437",
		},
		{
			id: 18,
			name: "Grillowany kurczak",
			category: "proteins",
			price: 7.25,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/c716/f6be/4b9275736ea1af57ab8fa01c7f932496?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=W9mqH8T28FQu4hbr~GO4qkzsuwfs8HKciMk9TfpSaVtt4tOwtxgHpmdxioF0NFw-imduZL4F7pnmUsDSYzetK9RO0STKbyhNX3LMk0yuObh1HLnaFarLSyCYG6eVWi~hJZJ~c1HGg1b4dACLREVTkDAuJi1KYpBFzcX~3huHIQJ01YlmG6mBVOCRLS1tNJt8gEnQtDNhkyh5J7tusza-PHuRnao9-t7ZaCSsvPrnVCc8kimLYWQer6H-WmUjw-066fMhP5m5KMt6ypkEKOok4KVWAhwcUpiwX8rjJk9mvjaetMh85uj~bwVkr0xI3nbuMmpQbivWF09bl~7ZtHCbVg__",
		},
		{
			id: 19,
			name: "Krewetki",
			category: "proteins",
			price: 12.75,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/978f1a22447889cdc69536872f65bd2a144442f9?fuid=951377600629151437",
		},
		{
			id: 20,
			name: "Tofu",
			category: "proteins",
			price: 6.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/9a17/d5ef/33fbb8dd0e32bb537bb08a2d3f300a90?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RJI3glZDJoui0odsOFhOC-vGEVzEEDSY3AR9oxP3X7nB0rTX33ZAQqN64~KJBEycUkR0wUezOFT2eh~iKSgcqiE0TiAuuaTc3sntv68UQbvcGgQ48A5aZb05~Rgt77ae3i1y6X~OSjcL9Iymr~9kOKZxdm9B2IwIUyedK5-o3BszK8Scm24lHvcdILLbboBcjqxmvtx8qcmundDllysy4gMm2q18-Yk7QbCemO7eVSMXZOTodB33-k0aYeLKFH5NMgkJAyHLi4TqgwxVxyvFYU~b1HGFs5q5LqjVU9L2iPuPF~xgdkXFzb9dOe6VqhEeV1WyPIh4cjKEG5R80K6FnQ__",
		},
		{
			id: 21,
			name: "Jajka na twardo",
			category: "proteins",
			price: 4.0,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/76156c9229a2df4573afb7648cad10f573dc41d7?fuid=951377600629151437",
		},
		{
			id: 22,
			name: "Tuńczyk",
			category: "proteins",
			price: 9.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/a4b4/bfa7/f11685fcd2b3172188be0d9fb9c22323?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gEgh2tEeaTDLzU8NOU8kOTpVHT4w8hJacpW~Wq0g3DfWA5nBGwX-u4t~j9YJOM3MS5G8BJvRy-AnL~XYpxdwsJYzyOWzc43~SH1ozfylUNhfupcamKS7tXbowfxfx14q1WPN8APijkfoxcpRMdNVK-qRxBa3J5tFHcYtEu8XLPY2BiVX54haDyuhg5~wMrl00WJOcg-TYuH6sq~f8dFnJbzfNNMptFVmB3mbU-0Y7fQE3zEcpgV-hqVbfE95QkRa3P~BAznqWlzzcmvNny37hHqT5anwNRuRb77Ha8qzf~iDaogHEgYfWih82UUOTzk7XtoZWQwW64tJHkLJ2hSztA__",
		},
		{
			id: 23,
			name: "Soczewica",
			category: "proteins",
			price: 3.75,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/8a455173fbc8afa9ebde8da12bf08d336bcec1fe?fuid=951377600629151437",
		},
		{
			id: 24,
			name: "Indyk",
			category: "proteins",
			price: 8.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/2398/124e/53060f8f75d2c173e286e20ec8c8394a?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ioGG43ZaMSDcFviMe5eKhLUrBdj45587li5h14qKPWo8HkEBAkhwHPlvanFw31uqdhn2De2IClJlMpIdU8t4aPXBPCM1FfjyYaunhBh~IEPnMEzHiXqyIcM3iWZEd~qdJuJY2aZkRsBW3eHqjqksqNlpGvxTgIWecdsM7ptPuNVXMNE1Ho~Gt-OJQutCTJ5CUPeK1tBiSJO42MYB8imz3UszIO1L9BtqAymraJEBisvcZBiJFhN9UiiiaCbmKGgS6~e496NgkjzKQJ512RotLeFt~eG1UnC5fLWM~-tqmuEcrV3ebq16BYwIUJLZoHBYCJCg96DwSWyIjBl70Vp2sA__",
		},
		{
			id: 25,
			name: "Wołowina",
			category: "proteins",
			price: 10.5,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/483a2daf9f06e9e2d2ca7eca6b6170fb7e325530?fuid=951377600629151437",
		},
		{
			id: 26,
			name: "Ser feta",
			category: "proteins",
			price: 6.25,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/1e77/a07b/e2d54bdc0a2a90f570891dd6eeb2334d?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XjMdB3qgoDyvYMBE-geJliRG8SFDpz7oK0g7HH610ZORn3aWSsfPa1AZDoKa1b7lztkyKNO8zz44RnVeLYh10GRUzQJqA81~H7S8ag2RwNYVTTYbqd-V9MAe9QUciQoz~ddwdsgdUljnETPVwV4iPhhxf6F7naYBus52gOQ6HjmfLOXnebZqgWE3hFoBc19xx7MuAKBMD9AMvsnFbzQD8DXJKQzJ5ivGfURtDQVd3fD6CbQy9Fi58H7qjIRS5qQ3ibkc74s2rxNc0Fu4YXE7zzJP2AWyuZhRyRHz5NN6XyAZsdwOkHnql4BuJyqvuqPPj3doBeBTfxE3lS20VSWOrw__",
		},
		{
			id: 27,
			name: "Oliwa z oliwek",
			category: "dressing",
			price: 5.25,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/d15602521a873ef2b00c65e8b36a0da8f0062584?fuid=951377600629151437",
		},
		{
			id: 28,
			name: "Sos Cezar",
			category: "dressing",
			price: 7.5,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/4c3b7b21c16ce1f22fd9ae9acd93055288aa34fe?fuid=951377600629151437",
		},
		{
			id: 29,
			name: "Ocet balsamiczny",
			category: "dressing",
			price: 4.25,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/c3b8/8de6/20118105869fab321c318a583c0dc9ea?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=g5ebIbWOiL~4y-KKUKURfwM6o~KAgA58ox660aEYjVMg9ZyFML9rPtZuxTJU~LIvaL4-Ves2q0xtXX4WKoxR~mFxDQQ7osm0tsyAFXwj1hdqEmLeQnSVIzGGAe3uAwBUWj7Zyqfv5QmgrSewUatczullpztxiyV9TAWFj0d78ur-Z3ICnC~hjwvESW6auFHxtYavR2QYwGSeTP9RUL4T5DDZt-F~l9tTTPW~jMo9N5xnS~mN0zR4QCdMYWlcZlwbngYMUw43V5JnAHC5njuEfefUZqEIjuIkWiUBvuyu9G8iH594e-1ubIIlpu5DKvN9GCZpsXr8nRLXWsYkSxDTuw__",
		},
		{
			id: 30,
			name: "Sos jogurtowy",
			category: "dressing",
			price: 3.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/d12f/fda7/33c7141c461254a7b1c8d66c04a97113?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bRGNCJ3DSk6F8wy2-d2Psri1kekXslVZYuJ9WizgN7DBay4rXYdd9QvJhxbJthpo1V8CJ5G9FIuBcVa0JPUHkPTpBLj8BRfSaOukxL4kafXqCO9QpVoAOI9jQt0HXOkHnYqDi7X7vlB3QmKMbbSpZ512QxWQMYVDzjgZR3x7IGAawUIHDtwVPceplm6ftL8o2VkOpl81RsViD04yet4CFo0mzYIeApg~8VHq4SuVaSZAu0nxCYKjaxJ~oxfvSEOQ0aF1z0vQiTlRAwULZ12ADUsdl9NvywuvxUYspBNiXaikWJ7-xxb-xFTN9cCaAHgw~RqjQVT9TGbuV~vr3WtOVg__",
		},
		{
			id: 31,
			name: "Sos pomidorowy",
			category: "dressing",
			price: 3.25,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/d97f/ebf9/d503649a6278376bf6a83c7abe92813c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OlsWQO7qPOFTSkyQYxwqqo5BG~EQYoDB6l70GOVu16nMTndxVgp0VK1lL9sK0UZgaoHSI32I3af0v0fSHHiD~p00TZMj5-kRkoenZ7nUjDeuU~gX72JuWP83bNTsMuhvPZ0omPqLv~whh-JWjdslNH7MUkKLbLAzMkSeJ1EYjwWUt2iEuo1PRpR07lb9S6XD7D1p2OvkfDzCGqlEK505UOpK~MTFgu76Lg-ZDWcaNhxpbKc~WpYuM9LAYDBlrWbsxtvqXsf~wqkFCuuNIIJ1z3qO6kFe4degTv3xE2ARfsaBePPZ2GcuCZBPaiL~DOCI2Gv~UDv61sfLyDXJt1RSYQ__",
		},
		{
			id: 32,
			name: "Sos musztardowy",
			category: "dressing",
			price: 2.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/02ec/60ca/9ec03e8ae6d620a543a3d1be03e6b870?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jrzIi7GZAD1aLqjO7Y8VaKErgFhPVT~aoCdASXfRImVrH3GFIaODel4NOj-EJHwPwO05FyO~QPChIfZFx8JR7~J36eom0DW4bA3F1r5uJykXv8YVWGy7Uw84AghZrASGa2yI7w7ePIrmd~7cjI7xO2EAwgd9Md2lYkqceOVF6eOnSpDPgpZ6GMoHNwbx9X1aJaIux5n2KNffOt4bgdXxOmkW640QnazxNqHJnif6tj3co-X0D~Amu0W~Y9m9KysnHtU9gB-x-q-Gjzx4nehZu2Q2u~zcjw09dT6cVnyh6S5K5Zx8Oqf9ydrEDBotFuYb4uobnB8O8UFbB4PlkWOwfA__",
		},
		{
			id: 33,
			name: "Sos winegret",
			category: "dressing",
			price: 3.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/041f/dae3/0cda807c7a159a8ed4148c9265034eca?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UWLkCAmo-WgkXvI0nC~GGk5hB06trXqa2d7K~kPvdhunp1nulgFxJetgPXAM~WvH465mXrEFemP86PJf619cuQw35T9MZYS6At~fgBJ83Zw6UykmUIlOPLM7wr1Qm5XoT4942P9lzBitZYGNLiHgpMtgcTShPHVMXfstg9CzxM1tx2zZxA~uSv58e0TIlZKwDMKv6R9tuICgFj9G42NVY-MXYWpCwYxWjgN6HkQcnykkeoZmPEvD7UXPNwKPfUQxGzKsWJZXuCrPTwmzb96Sr~AaEvWMYqDr0AdUJe92pYvOh6-zNjZ11CofE7x-R5aQtVodzW0aZbYKkI6ArDeUmQ__",
		},
		{
			id: 34,
			name: "Sos sezamowy",
			category: "dressing",
			price: 4.0,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/fb91/67c4/76069c6982a04d56e1f8d04e5cbce634?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qWxF7ZR7qj-g-2LKZZT9S~6ZvaypnsdEPfSH2Ztlji6vCmk-04Z8WsiXiUcjq9H6S06Ooh8YFsL7WL8S4KcsvhV-9if1x0EwjR~m12YbDh2WY3f5z6mcpJEu3GbwAJ8KGSaMRrfze4P8LqKvEesVJEMPQL2lqBvwFLbLJ7ZRyxJDN7qpKUmxMpbWMlb-mqJGn6A5nCmGyzidbSN-6h9Rm-MGwGeMMfID61MSJiu8i3aNOmzwFc6X35cQmjzdJar-EJ-Wo8tjdhb1mVysz-9ecBZm~BrEA3PdMhxS5lRqJ2HH-JQsotFLfiMn2ecsPJx8IknXvkGkmMg4AIgtMKfheQ__",
		},
		{
			id: 35,
			name: "Sos tahini",
			category: "dressing",
			price: 4.75,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/f1a12989446121a6728f56a91fd8ee67b524ca0c?fuid=951377600629151437",
		},
		{
			id: 36,
			name: "Orzechy włoskie",
			category: "toppings",
			price: 5.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/7fb2/a578/260d04bd91fe72d9a94393bf5105efd1?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Szm1b1FgubSTBiHP~1VtMDbksh3xoGtEBDJX2Zw7yKcsw0tON9QuXbuW0dKH-sTGQCCH-BDL~QC8jFHqewXzdpv0LquEPpItFTJTX4ZA7el~3bBZPi-8rsfLm9-fKm0Tfs4NekCMUfVfXTxA43g2lTgpchgPoHSWhoLNiw5pVFlaFJjAZICw9NsGcJik~6kf8ZzgyTxZ9L0YAfs0uSLgh8SkVPfzZtvRCoqzzAahzP0uWQJ7WZgam2cIG3yfBpXdNg-XwEg8AJMp3EX7kr1H7kOwxJ36j6iDiQOImGH9nsrlhAo5prEm7i-pKsnlaVB6QLtCsHHmVBalX-XazamcxQ__",
		},
		{
			id: 37,
			name: "Orzechy nerkowca",
			category: "toppings",
			price: 6.5,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/cc9d135df3d7b4078738b6cb35ea4b46011cdd09?fuid=951377600629151437",
		},
		{
			id: 38,
			name: "Nasiona słonecznika",
			category: "toppings",
			price: 4.25,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/0f75/430c/2e0d3efbb1ff44fbdfbc275b677f9c9c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CZ57tMjLA8nzD~eUcdKMVW0s1ILLcgI3t4VVncARWYtACuMTFyszkgT-R9uUJfDjIn55fdq7VVmUzeK-MgY8namny2ReDU1HZVTSLAeahnv7oOkduorl1T2TsE9F3w2TFjsPyFaqcWiMu7muh5TpVBRU0JOqgFOZ~N99P9yEv1gMxSinzoIzbbFUKCa2du3nyYAwHmkm~e5HAfH8-ioZ~Wi-IZoJ0EDbz2QJvcX4Kt7j7veZ-1OOT~~esuwRzEOYxoLH2rTC6HfHQ0dh8qxvGy9j~um7FUQAOM8L76805inygUJQ9ZkW6dMcSzVEZE-MNPxdlq8QkEkx-G6Oadv3iw__",
		},
		{
			id: 39,
			name: "Nasiona dyni",
			category: "toppings",
			price: 3.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/ffbc/da03/b63ff2c3852e7575202a0c57ebbb6b02?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sxzel4f-q6SuQ~QgH~h1oLw9RZMIyHh5RfeGjTCaiccn4WBMk-EmH-p3r3mDLVes7v0xUVZgv35H9OJkQ3yhmgZjl1cBkzj6clkJdoAB1cBjhWtQ8FoQHkl~45Vx60RoyqeM4OOdujbQFNdjeuYza2qt5RTo1q1mfu~A-KOPHTL1l4WeDf9IQEKRfs6UFE80nw2IKFDWja~kyeLBgC-5gRB3Vmg2ER1TQ3XrmMK46G4TqYgme0zNj62Ib8LtlUFSmt8o3IE1Qa0QIDtEt~5a1BzBZGZIX2DnEvhIU0nR4fWymErdP~~8-oHRshuTVFLw6BvZF1qu3BrQX4jxROxPWw__",
		},
		{
			id: 40,
			name: "Suszona żurawina",
			category: "toppings",
			price: 6.0,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/ad43bcfe71bd32d72acaee86142cc313709d0c83?fuid=951377600629151437",
		},
		{
			id: 41,
			name: "Suszone morele",
			category: "toppings",
			price: 7.5,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/57a83a82dbe5c731a0c4b4ab44308b4a838d0a03?fuid=951377600629151437",
		},
		{
			id: 42,
			name: "Prażone pestki dyni",
			category: "toppings",
			price: 4.25,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/f0be5997eb76522fc8d89369cac54e640eaca43d?fuid=951377600629151437",
		},
		{
			id: 43,
			name: "Pokrojone oliwki",
			category: "toppings",
			price: 5.5,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/9cea/f03d/7e1583de9cc01cb4a14d2a7f324fb341?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oNs6UVcQNWeQnW2O1yfZ40cMRKXlu-m5ixS~U0-lqo1qR0oU9y3HmTGLOVZZ88PHYz03S1U3iwitUQ4RssPOctXkUSHQCit6Z58cP5wNgsRfrJoOJQI8m7S5naICfR3tsIYMAdOrzJ-1ORuF3pFRJ3V7NrKUvref1t6rDhV33yD0cXtXMLH06~8~ilKM68OmeMxicBZy28DXZ4DanZ2P3CiYJYGPlQQ5OmezVZTpzWUQ9kFDQK9SAIfu-ak~ksV62r5b1ED4L3iToJBK~4gtcmajjNhpYH~cY7nchWlJuCHpQtYPKZR9vJIOzRa1ioRtFpd3VyCEvRcmd-TJXUyEWQ__",
		},
		{
			id: 44,
			name: "Kapary",
			category: "toppings",
			price: 3.25,
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/eb107b0d8c2789a46dade2a1dd6cb0d24aa0207d?fuid=951377600629151437",
		},
		{
			id: 45,
			name: "Ser mozzarella",
			category: "toppings",
			price: 6.75,
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/91af/5049/6fb2b911bc565b11ce3aa571acf0d95c?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b2h1WRG30x3c0vwf0vskBY70rpm3DIex3IgseNQZG0NA9naeQ9x2ce6UCdUdpYKY9WOmrdH1kI0OnmvqEawHIlvcfbVj06twz9PUGHgHfL0-sdi9xLaa3HupgrPer~zmCpJX0E-LIZMfmCMB7mplVMXuv8tHGphcMsNgjj1uToUBwMyzyrsTufmE8n~zuUr5YvjawN2LFw7MSnG6GdLR2pfFcaKL0fGvg~G-M5gkHMaKMFKyqydjyVKNQqF1YmdMK8Sln8xQHN98wGayz0W4~RnQZ4s2gJw6x9Gyf-62QY63hyI~R8R0wnOdeMwVc-5fplZUWFOJgkF5z8UuQFZ2Vg__",
		},
	];
	res.json(ingridients);
});

module.exports = router;
