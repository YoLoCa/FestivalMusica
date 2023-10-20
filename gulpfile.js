const {src, dest, watch, parallel} = require("gulp");

// CSS
const sass = require ("gulp-sass")(require('sass'));
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');


function css (done){
    src("src/scss/**/*.scss") //Identificar el archivo de SASS
    .pipe(plumber())
    .pipe(sass()) //Compilarlo
    .pipe(dest("build/css")); // Guardar en el Disco Duro
     done(); //callback
}

function imagenes(done){
    const opciones = {
        optimizationLevel : 3
    }

    src('src/img/**/*.{png,jpg}')
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    done();
}

//Convertir png, jpg a Webp
function versionWebp (done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    done();
}

//Convertir png, jpg a Avif
function versionAvif (done){
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function javascript(done){
    src('src/js/**/*.js')
    .pipe(dest('build/js'))
    done()
}

//Compilar y guardar cambios Automaticamente
function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done ();
}

//Llamadas funciones
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev); //Ejecuta 2 tareas en paralelo 1º webp 2º dev

