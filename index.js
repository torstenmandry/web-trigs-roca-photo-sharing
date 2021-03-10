import express from "express";
import nunjucks from "nunjucks";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import path from "path";

let HOST = "localhost";
let PORT = 3000;

let PROFILE = {
    name: 'Torsten Mandry',
    title: 'Frontend Noob',
    image: 'https://uploads.innoq.com/4gxstu4sysnzppna6tuj4pqs0qlu?response-content-disposition=inline%3B%20filename%3D%22torsten-mandry-ava-2020-02.jpg%22%3B%20filename%2A%3DUTF-8%27%27torsten-mandry-ava-2020-02.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJHA5PEZW3OX32LYA%2F20210306%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20210306T082922Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=946d6e0d180cc6047ce7086b3c0bb6e7c70c54da6de9c5093377c2b995f1a011'
}

let IMAGES = [{
    id: 123,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Gecarcinus_quadratus_%28Nosara%29.jpg/2560px-Gecarcinus_quadratus_%28Nosara%29.jpg",
    description: "Gecarcinus quadratus, a land crab from Central America",
    source: "https://en.wikipedia.org/wiki/Crab",
    likes: 17,
    likedByCurrentUser: true
}, {
    id: 124,
    url: "https://upload.wikimedia.org/wikipedia/commons/4/49/Ocypode_quadrata_%28Martinique%29.jpg",
    description: "Ocypode quadrata (Thoracotremata: Ocypodidae)",
    source: "https://en.wikipedia.org/wiki/Crab",
    likes: 12,
    likedByCurrentUser: false
}, {
    id: 125,
    url: "https://www.abc.net.au/reslib/201006/r576376_3593030.jpg",
    description: "Male fiddler crab watch for other males waving their 'love claw' to detect the presence of a female",
    source: "https://www.abc.net.au/science/articles/2010/06/02/2915161.htm?site=science/tricks&topic=latest",
    likes: 23,
    likedByCurrentUser: true
}, {
    id: 126,
    url: "https://rasamalaysia.com/wp-content/uploads/2019/12/baked-crab1.jpg",
    description: "Baked Crab",
    source: "https://rasamalaysia.com/baked-crab-recipe/",
    likes: 0,
    likedByCurrentUser: false
}, {
    id: 127,
    url: "http://de.spongepedia.org/images/Krabs.jpg",
    description: "Mr. Krabs",
    source: "http://de.spongepedia.org/index.php/Mr._Krabs",
    likes: 2,
    likedByCurrentUser: false
}];

let ROOT = path.dirname(fileURLToPath(import.meta.url));

let app = express();
app.use("/assets", express.static(absolutePath("./assets")));
nunjucks.configure(absolutePath("./views"), {
	express: app
});
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.html", { images: IMAGES, profile: PROFILE });
});
app.get("/profile/edit", (req, res) => {
    res.render("profile-edit.html", { profile: PROFILE });
})
app.post("/profile/edit", (req, res) => {
    let { name, title } = req.body;
    PROFILE.name = name
    PROFILE.title = title
    res.redirect("/");
})
app.post("/image/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let like = parseInt(req.body.like)
    console.log(`POST /image/${id} - like ${like}`)
    let image = IMAGES.find(img => img.id === id)
    image.likes += like
    image.likedByCurrentUser = like > 0
    res.redirect("/");
})

let server = app.listen(PORT, HOST, _ => {
	let { address, port } = server.address();
	console.log(`→ http://${address}:${port}`);
});

function absolutePath(filepath) {
	return path.resolve(ROOT, filepath);
}
