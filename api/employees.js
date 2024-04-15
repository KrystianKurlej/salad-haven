const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	const employees = [
		{
			id: 1,
			name: "Pásztor Kíra",
			role: "Web Designer",
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/ea3a/eaf9/7e251939bf7493c8a43ae295aa2d1d7b?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=kzqiNKQM8OxnYN6bcCgkOGB9VacQnQn8FkBc0Ejxur8AH1ImvIyndOQ7ri1VJFhnuHImdSZU~GtMbRniNem4cmGZST8tLPRnR0JmLUBvdVETm7yzD9l-9jMxoyHlAq7lpOhKgzwsRAA-KyomC8o5P0inMVu2gOx1ss2TD0o0y9vLUTk1PZJ3WhzdV1gqBhQI6Yj9I19pnF4FAza4td3xLd51wCgLbXH3KfRp4w7mxlUG7sN5X7UoZXd3uYu3H9HkOPBsEuNM~Z6cd55TowyjGC7W~e3VU9xdUGsESwwzizsIlJav2g-wnvYFZphNkv7tGOybqqdoyLlEQsMuKZToTw__",
		},
		{
			id: 2,
			name: "Sípos Veronika",
			role: "Nursing Assistant",
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/2a524cff5f89a002f87720f5013d8506e4c0ca2a?fuid=951377600629151437",
		},
		{
			id: 3,
			name: "Szekeres Dalma",
			role: "Dog Trainer",
			imgSrc:
				"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/1834d36b709e542887384ec7995f400f634764c8?fuid=951377600629151437",
		},
		{
			id: 4,
			name: "Vincze Nikolett",
			role: "Marketing Coordinator",
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/630f/ef60/e6cb228a552f15430bdb134525267360?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YpECXapr1O1Kie3DKoVlYlW4pOhsbGPIu3dZ7k6F7pgRuUYPq5D9naIIN-Gn5qnpwE6khdc1V1zhnHpDRcmmsx2~lrhyU4iUHMqLGypVPr8RRtJOwjmFI~nXDNaJ7JT49CAc-pqL9zwo8E~Rg75ttFlmYy3O2g4L5v4wqhfhmUbb5rWYQoUG5wWlYYxi6voHYbABQ56b2dW~0jXWcO7y2XRDn7g~p6FXypZDJi-zpYS0aHQRyEO0LjgkyCdtMq0ouFR6lU2Axauw0DDjxfwrGOHIy38865mvJoVCDypnvv9kvMSE7~7m9kZspnPvZuII7P86XGZMcFr85wxd1~E7NA__",
		},
		{
			id: 5,
			name: "Kende Lili",
			role: "Medical Assistant",
			imgSrc:
				"https://s3-alpha-sig.figma.com/img/39bd/c04f/e737c4c020de9b45d48a85c97e68a9ca?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i3a4LqTKe6ej7C4nLV3M38jMddpgPgF~TMq3nLdiD7-G-Y9Ydu~9RTkHptMhJpz5ggIa8LPwh9yp9edT08zcegcLhNqj6cn78mEx-O5LKdvi1MDWGPj4wWcfjo-7tM7n~t-5HOcUEUUxlhCzI8iCqianJ~xlW76QQrkyY1WRaMoPCAt5HDa4Pkjfheg8bSa0iVdyE4REAOYU8SwzNyEzM3AXrsOYMPfXJ8NBztAyysm3eNxQO329UoEn79U94gV3JsnwXbpyeWQkow2vVTL0sKPhFN53NiRSz1bQlOM3Uouv7FRQk~vSRzVVDduR2Ugh-1hRGRThq-D2xPTqacqjXw__",
		},
	];
	res.json(employees);
});

module.exports = router;
