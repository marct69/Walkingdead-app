var gulp = require("gulp"); // appelle le module gulp
var browserSync = require("browser-sync"); // appelle le module browser-sync
var sass = require("gulp-sass");



//Rafraichissement du browser (navigateur)
var reload = browserSync.reload;

var minifyCss = require("gulp-minify-css");
var concat = require("gulp-concat");
var notify = require("gulp-notify");
var uglify = require("gulp-uglify");

var gulpSize = require("gulp-size");
var gulpUncss = require("gulp-uncss");
var sourcemaps = require('gulp-sourcemaps'); // sourcemap




//Tache qui permet de configurer au lancement browser sync et lance le serveur dans le browser
gulp.task("browser-sync", function(){
  browserSync({
    port: 3000,
    server: {
      baseDir: "./", // répertoire de base
      index: "index.html" // fichier lancé par défaut
    }
  });
});

// Création d'une tache par défaut, qui sera lancée par défaut avec gulp
gulp.task("default", ["browser-sync"], function(){ //tache par defaut
  console.log("Ma tache par défaut");
  gulp.watch("*./css", ["css"]); //Permet d'observer les changements de fichiers cssdu dossier css et de relancer la tache css
  gulp.watch("./sass/**/*.scss", ["sass"]); //sass
  gulp.watch("./js/*.js", ["js"]); //js
})



// Minify CSS

gulp.task("css", function(){ //tache pour css
  console.log("tache css")
  return gulp.src(["style.css", "style2.css"])   // source des fichiers css => va donner 2 fichiers minimifiés séparés
  .pipe(concat("bundle.css")) // concatone en 1 seul fichier
  .pipe(minifyCss()) // Permet de minimifier le css
  .pipe(gulp.dest("dist/css/")) //permet d'envoyer le fichier minimifié dans le répertoire dist/css
  .pipe(notify("C\' est fait !")) // Notify
  .pipe(reload({stream:true, once:true})); //Je relance mon navigateur quand ma tache css est accomplie
})


// SASS



gulp.task("sass", function(){ //tache pour Sass
  console.log("tache sass")
  return gulp.src("./sass/*.scss")   // source des fichiers scss
  .pipe(sourcemaps.init())  // sourcemaps
  .pipe(sass().on("error", sass.logError)) // compile du sass en css
  .pipe(concat("bundle-sass.css")) // concatone en 1 seul fichier
  .pipe(minifyCss()) // Permet de minimifier le css
  .pipe(sourcemaps.write()) // Sourcemaps
  // .pipe(size())   // Gulp-Size
  // .pipe(uncss({html: ['index.html']}))   // gulp uncss
  .pipe(gulp.dest("dist/css/")) //permet d'envoyer le fichier minimifié dans le répertoire dist/css
  .pipe(notify("Tache Sass faite !")) // Notify
  .pipe(reload({stream:true, once:true})); //Je relance mon navigateur quand ma tache css est accomplie
})



gulp.task("js", function(){ // tache pour js
  console.log("tache js")
  return gulp.src("js/*.js")
  .pipe(concat("app.min.js"))
  // .pipe(uglify())
  .pipe(gulp.dest("dist/js"))
  .pipe(notify("JS modifié"))
  .pipe(reload({stream: true, once:true}))
})
