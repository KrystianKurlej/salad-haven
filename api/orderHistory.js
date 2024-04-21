const express = require("express");
const router = express.Router();

const orderHistory = [
	{
		clientId: 1,
		history: [
			{
				orderId: 1,
				date: "2024-04-21",
				products: [
					{
						id: 1,
						status: "new",
						title: "Sałatka Makaron pełnoziarnisty",
						shortDescription:
							"Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
						price: 42,
						thumbnailUrl:
							"https://s3-alpha-sig.figma.com/img/a8af/668a/840aabaa600dd29c96ec9044995c3569?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j5ZdMGcLUVcswEAANJcWuVPlmizli8sYl-ee55ZxVRCzTlSQjgSrNAUhgcW9TJi1GnIDvWydafVjHxn8Her-NVKShNIGqjNl7LJi9XXeFTtCn-jGge3I7U-kMLm9uY6klzzNqD5RXgubHIes-DcBCJAkuZSu8q15uuMer7pPtAUMcoB~t2ZehHmDysbyzxxuEXbbqKCRvoG1PbN-HjTAMUt~o44O2I3mLnpFKy1cM~91OEPUNrrzSO-PrkzTxap4n0jPr7~lKrO9USsfRazZ7QDxsWFGoxXlhu6l4sEv~Fg0ixygOpqeshMzvG~YTiPkyFE6bplxdrK0p5uJYvDChw__",
					},
					{
						id: 2,
						status: "new",
						title: "Jarmuż",
						shortDescription:
							"Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
						price: 34,
						thumbnailUrl:
							"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/eda68c14b3eb6a295aaa248ee7013b3265712fe7?fuid=951377600629151437",
					},
					{
						id: 3,
						status: "new",
						title: "Jarmuż",
						shortDescription:
							"Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
						price: 34,
						thumbnailUrl:
							"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/eda68c14b3eb6a295aaa248ee7013b3265712fe7?fuid=951377600629151437",
					},
					{
						id: 4,
						status: "new",
						title: "Sałatka Makaron pełnoziarnisty",
						shortDescription:
							"Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
						price: 42,
						thumbnailUrl:
							"https://s3-alpha-sig.figma.com/img/a8af/668a/840aabaa600dd29c96ec9044995c3569?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j5ZdMGcLUVcswEAANJcWuVPlmizli8sYl-ee55ZxVRCzTlSQjgSrNAUhgcW9TJi1GnIDvWydafVjHxn8Her-NVKShNIGqjNl7LJi9XXeFTtCn-jGge3I7U-kMLm9uY6klzzNqD5RXgubHIes-DcBCJAkuZSu8q15uuMer7pPtAUMcoB~t2ZehHmDysbyzxxuEXbbqKCRvoG1PbN-HjTAMUt~o44O2I3mLnpFKy1cM~91OEPUNrrzSO-PrkzTxap4n0jPr7~lKrO9USsfRazZ7QDxsWFGoxXlhu6l4sEv~Fg0ixygOpqeshMzvG~YTiPkyFE6bplxdrK0p5uJYvDChw__",
					},
				],
			},
		],
	},
	{
		clientId: 2,
		history: [
			{
				orderId: 1,
				date: "2024-04-19",
				products: [
					{
						id: 1,
						status: "new",
						title: "Sałatka Makaron pełnoziarnisty",
						shortDescription:
							"Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
						price: 42,
						thumbnailUrl:
							"https://s3-alpha-sig.figma.com/img/a8af/668a/840aabaa600dd29c96ec9044995c3569?Expires=1714348800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j5ZdMGcLUVcswEAANJcWuVPlmizli8sYl-ee55ZxVRCzTlSQjgSrNAUhgcW9TJi1GnIDvWydafVjHxn8Her-NVKShNIGqjNl7LJi9XXeFTtCn-jGge3I7U-kMLm9uY6klzzNqD5RXgubHIes-DcBCJAkuZSu8q15uuMer7pPtAUMcoB~t2ZehHmDysbyzxxuEXbbqKCRvoG1PbN-HjTAMUt~o44O2I3mLnpFKy1cM~91OEPUNrrzSO-PrkzTxap4n0jPr7~lKrO9USsfRazZ7QDxsWFGoxXlhu6l4sEv~Fg0ixygOpqeshMzvG~YTiPkyFE6bplxdrK0p5uJYvDChw__",
					},
					{
						id: 2,
						status: "new",
						title: "Jarmuż",
						shortDescription:
							"Makaron pełnoziarnisty\nPomidory\nKurczak\nSos winegret",
						price: 34,
						thumbnailUrl:
							"https://www.figma.com/file/1ngHHeI9pqfdetlKhFIWxy/image/eda68c14b3eb6a295aaa248ee7013b3265712fe7?fuid=951377600629151437",
					},
				],
			},
		],
	},
];

router.get("/:clientId", (req, res) => {
	const clientId = parseInt(req.params.clientId, 10);
	const clientOrders = orderHistory.find(
		(order) => order.clientId === clientId
	);

	if (!clientOrders) {
		return res
			.status(404)
			.json({message: "Nie znaleziono zamówień dla tego klienta."});
	}

	res.json(clientOrders);
});

module.exports = router;
