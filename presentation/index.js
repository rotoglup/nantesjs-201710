// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  CodePane,
  Deck,
  Heading,
  Image,
  ListItem,
  List,
  Notes,
  Quote,
  Slide,
  Text
} from "spectacle";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png"),
  logo_mgd: require("../assets/logo_mgd_v5.png"),
  rotoglup: require("../assets/rotoglup_denyzor.png"),
  maputnik: require("../assets/maputnik.gif"),
  openmaptiles: require("../assets/openmaptiles.png"),
  github: require("../assets/github.png"),
  mapbox: require("../assets/mapbox.png"),
  tiles_schema: require("../assets/tiles_schema.png"),
  vector_tile_example: require("../assets/vector_tile_example.png"),
  raster_vs_vector: require("../assets/raster_vs_vector.jpg"),
  chrono: require("../assets/chrono.png"),
  balance: require("../assets/balance.png"),
  mgdesign_altimetrie: require("../assets/mgdesign_altimetrie.jpg"),
  mgdesign_lnpn: require("../assets/mgdesign_lnpn.jpg"),
  mgdesign_vendome: require("../assets/mgdesign_vendome.jpg"),
};

const styles_ex = {
  work_base: require("../assets/style_work_base.json"),
  polygons: require("../assets/style_base_polygons.json"),
  polygons_filter: require("../assets/style_base_polygons_filter.json"),
  lignes: require("../assets/style_base_lignes.json"),
  lignes_labels: require("../assets/style_base_lignes_labels.json"),
  points: require("../assets/style_base_points.json")
}

preloader(images);

let theme = createTheme({
  primary: "#EEE",
  secondary: "#03A9FC", //"#1F2022",
  tertiary: "CECECE", //"",
  quartenary: "CECECE", //"#"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});


function showMapboxgl() {
  console.log("showMapboxgl");
  document.getElementById('mbgl-map').style.visibility = 'visible';
  //document.getElementById('iframe-panel').style.display = 'none';
  //document.getElementById('iframe-panel').src = 'http://www.maptiler.org/google-maps-coordinates-tile-bounds-projection/';
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

let _g_dirty_globals = {
  style: null
};

class Mapboxgl extends React.Component {

  componentWillMount() {
    
    showMapboxgl();
    
    if (this.props.flyTo) {
      g_mbgl_map.flyTo(this.props.flyTo);
    }
    
    g_mbgl_map.showTileBoundaries = !!this.props.showTileBoundaries;

    let style = this.props.style || style_default;
    if (_g_dirty_globals.style != style) {            // NOTE(nico) pour éviter le repaint complet de la carte
      _g_dirty_globals.style = style;
      g_mbgl_map.setStyle(style);
    }
  }

  render() {
    return null;
  }
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

const location_world = {
  center: [0, 0],
  zoom: 1.01,
  bearing: 0
}

const location_france = {
  center: [-1.55, 47.216671],
  zoom: 5,
  bearing: 0
}

const location_nz = {
  center: [166.6, -40.4339731],
  zoom: 4,
  bearing: 0
}

const location_nantes = {
  center: [-1.55, 47.216671],
  zoom: 12.75,
  bearing: 0
}

const location_mgdesign = {
  center: [-1.556206, 47.20675],
  zoom: 15.0,
  bearing: 0
}

const location_google = {
  center: [-122.0840782, 37.4220238],
  zoom: 17.25,
  bearing: 0
}

const location_mapbox = {
  center: [-122.3999209, 37.7884401],
  zoom: 17.0,
  bearing: 0
}

const style_streets = 'mapbox://styles/mapbox/streets-v9';
const style_basic = 'mapbox://styles/mapbox/basic-v9';
const style_dark = 'mapbox://styles/mapbox/dark-v9';
const style_default = style_basic;

const style_raster = {
  "version": 8,
  "sources": {
    "raster-tiles": {
        "type": "raster",
        "url": "mapbox://mapbox.streets",
        "tileSize": 256
    }
  },
  "layers": [{
    "id": "simple-tiles",
    "type": "raster",
    "source": "raster-tiles",
    "minzoom": 0,
    "maxzoom": 22
  }]
}

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------

export default class Presentation extends React.Component {
  render() {

    const slideProps = { transition: ["fade"] };
    const codeProps = { style: { fontSize: "1.4rem"} };

    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>

        <Slide transition={["zoom"]} bgColor="primary">
          <Mapboxgl flyTo={location_nantes}/>
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Promenade au pays de la carto
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} bold>
            mapboxgl
          </Text>
        </Slide>

        <Slide transition={["fade"]}>
          <Mapboxgl flyTo={location_mgdesign}/>
          <Image src={images.rotoglup.replace('/', '')} width="20%"/>
          <Heading size={3} textColor="secondary">Nicolas Lelong</Heading>
          <Heading size={6}>@rotoglup</Heading>
          <Heading size={6} textColor="primary">spacer</Heading>
          <CodePane {...codeProps} source='void hello(char const* world) { printf("Hello %s", world); }'></CodePane>
          <CodePane {...codeProps} source='def hello(world): print "Hello %s" % world'></CodePane>
          <CodePane {...codeProps} source='function hello(world) { console.log(`Hello ${world}`); }'></CodePane>
          <Appear>
            <Image src={images.logo_mgd.replace('/', '')} width="60%"/>
          </Appear>
        </Slide>
        

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_world} style={style_streets}/>
          <Heading size={3}>Pourquoi mapboxgl ?</Heading>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_google} style={style_streets}/>
          <Heading size={3}>Pourquoi pas</Heading>
          <Heading size={4} textColor="tertiary">Google (Maps) ?</Heading>
          <Appear><div>
            <Text>Seulement online</Text>
            <Text>Entièrement propriétaire/fermé</Text>
            <Text>"Your API will be deprecated very soon"</Text>
          </div></Appear>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_mapbox} style={style_streets}/>
          <Heading size={3}>mapbox(gl)</Heading>
          <Appear><div>
            <Text>Self-hosting possible</Text>
            <Text>Données, formats, API, code</Text>
            <Text>Ouverts</Text>
            <Image src={images.github.replace('/', '')} width="25%"/>
          </div></Appear>
        </Slide>

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_world} showTileBoundaries={true}/>
          <Heading size={3}>L'important, c'est la tuile</Heading>
          <Image src={images.tiles_schema.replace('/', '')} width="80%"/>
          <Text>Le monde découpé en carrés</Text>
          <Text>"quadtree"</Text>
        </Slide>

        <Slide {...slideProps}>
          <Mapboxgl style={style_raster} showTileBoundaries={true}/>
          <Heading size={3}>Tuiles "raster"</Heading>
          <Text>JPG, PNG, 256x256</Text>
          <Notes>
            * Depuis ~2004<br/>
            * Google Maps ; OSM<br/>
            * Toujours bien utile ; Leaflet<br/>
            * Images précalculées ou générées sur le serveur<br/>
            * Démo grand écran<br/>
          </Notes>
        </Slide>

        <Slide {...slideProps}>
          <Mapboxgl style={style_streets} showTileBoundaries={true}/>
          <Heading size={3}>Tuiles "vecteur"</Heading>
          <Text>GeoJSON, TopoJSON, 'MVT', ...</Text>
          <Image src={images.vector_tile_example.replace('/', '')} width="60%"/>
          <Notes>
            * Depuis ~2014<br/>
            * Google Maps<br/>
            * Puis Mapbox<br/>
            * Stockage des formes et données associées<br/>
            * Style à part<br/>
            * Démo grand écran<br/>
          </Notes>
        </Slide>

        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_nantes} style={style_streets}/>
          <Heading size={3}>Tuiles "vecteur"</Heading>
          <Heading size={4} textColor="tertiary">avantages</Heading>
          <Appear><div>
            <Image src={images.raster_vs_vector.replace('/', '')} width="30%"/>
            <Text/>
            <Image src={images.balance.replace('/', '')} width="15%"/>
            <Text/>
            <Image src={images.chrono.replace('/', '')} width="15%"/>
          </div></Appear>
          <Notes>
            * Zoom<br/>
            * Poids (tuile = 15% plus léger)<br/>
            * Moins de tuiles, donc moins de temps de génération<br/>
          </Notes>
        </Slide>

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Heading size={3}>Un peu de contexte</Heading>
          <Heading size={4} textColor="tertiary">mapbox, sans gl</Heading>
          <Image src={images.mapbox.replace('/', '')} width="25%"/>
          <Notes>
            * ~500 personnes<br/>
            * $$$ = services (geocodage, itineraires, hébergement cartes)<br/>
          </Notes>
        </Slide>
        
        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_nantes} style={style_basic}/>
          <Heading size={3}>Les données carto</Heading>
          <List>
            <ListItem>Spécification de données</ListItem>
            <ListItem>Hébergement</ListItem>
            <ListItem>Pas que mapbox</ListItem>
          </List>
          <Appear><div>
            <Text>openmaptiles</Text>
            <Image src={images.openmaptiles.replace('/', '')} width="60%"/>
          </div></Appear>
          <Notes>
            * Données tirées de OSM<br/>
            * Catégorisées pour utilisation 'simple'<br/>
            * Données perso<br/>
            * appear / openmaptiles
            </Notes>
        </Slide>
        
        <Slide {...slideProps}>
          <Mapboxgl style={style_dark}/>
          <Heading size={3}>Les cartes</Heading>
          <List>
            <ListItem>Spécification de style</ListItem>
            <ListItem>Editeurs visuels</ListItem>
            <ListItem>Pas que mapbox</ListItem>
          </List>
          <Appear><div>
            <Text>maputnik</Text>
            <Image src={images.maputnik.replace('/', '')} width="60%"/>
          </div></Appear>
          <Notes>
            * Style = JSON<br/>
            * Outils desktop d'abord = faile<br/>
            * Outil en ligne seulement "Studio"<br/>
            * Appear / maputnik<br/>
          </Notes>
        </Slide>
        
        <Slide {...slideProps}>
          <Heading size={3}>mapbox</Heading>
          <Heading size={5} textColor="tertiary">Beaucoup de code</Heading>
          <Image src={images.github.replace('/', '')} width="25%"/>
          <Notes>
          * Librairies diverses autour de la carto<br/>
          * ex. Format 'mbtiles'<br/>
          * ex. Triangulation de polygones<br/>
          </Notes>
        </Slide>

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Heading size={3}>mapbox*gl*</Heading>
          <Heading size={4} textColor="tertiary">enfin !</Heading>
          <Notes>
          * Version JS / webgl<br/>
          * Version Native C++ / OpenGL<br/>
          </Notes>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={5} textColor="secondary">mapboxgl</Heading>
          <Heading size={3}>API de carto 'classique'</Heading>
          <Appear><div>
            <Text>Contrôle du point de vue</Text>
            <Text>Marqueurs et popups</Text>
            <Text>Sélection 'features'</Text>
            <Text>Bonne doc, beaucoup d'exemples</Text>
          </div></Appear>
          <Notes>
          * Controle du point de vue<br/>
          * Marqueurs / popup<br/>
          * Ajout suppression de données<br/>
          * Bonnes docs sur le site<br/>
          * Mieux dans leaflet<br/>
          </Notes>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={5} textColor="secondary">mapboxgl</Heading>
          <Heading size={3}>Style</Heading>
          <Text>Spécification ouverte</Text>
          <Image src={images.github.replace('/', '')} width="25%"/>
          <Notes>
          * Moins documentée<br/>
          * Cachée derrière les outils<br/>
          * Idée générale<br/>
          + sources de données<br/>
          + calques (filtre + style)<br/>
          </Notes>
        </Slide>

        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_france}/>
          <Heading size={5} textColor="secondary">Style</Heading>
          <Heading size={3}>Sources</Heading>
          <CodePane {...codeProps} lang="javascript" source={`
"sources": {
  ...
  "mapbox-streets": {
      "type": "vector",
      "tiles": [
        "http://a.example.com/tiles/{z}/{x}/{y}.pbf",
        "http://b.example.com/tiles/{z}/{x}/{y}.pbf"
      ],
      "maxzoom": 14
  }`}/>
          <Notes>
          * aussi raster<br/>
          * vidéo...<br/>
          </Notes>
        </Slide>

        <Slide {...slideProps}>
        <Mapboxgl style={styles_ex.polygons}/>
        <Heading size={5} textColor="secondary">Style</Heading>
        <Heading size={3}>Calques</Heading>
        <Text>Polygones</Text>
        <CodePane {...codeProps} lang="javascript" source={`
"layers": [
...
{
  "id": "landcover",
  "type": "fill",
  "source": "mySource",
  "source-layer": "landcover",
  "paint": {
    "fill-color": "#EEE",
    "fill-outline-color": "#CCC"
  }
}`}/>
          <Text>Les terres en général</Text>
          <Notes/>
      </Slide>

      <Slide {...slideProps}>
          <Mapboxgl style={styles_ex.polygons_filter}/>
          <Heading size={5} textColor="secondary">Style</Heading>
          <Heading size={3}>Calques</Heading>
          <Text>Filtre</Text>
          <CodePane {...codeProps} lang="javascript" source={`
{
  "id": "landcover-wood",
  ...
  "filter": [ "==", "class", "wood" ],
  "paint": {
    "fill-color": "#B0DEC4"
  }
}
`}/>
          <Text>La forêt</Text>
        </Slide>

        <Slide {...slideProps}>
        <Mapboxgl style={styles_ex.lignes}/>
        <Heading size={5} textColor="secondary">Style</Heading>
        <Heading size={3}>Calques</Heading>
        <Text>Lignes</Text>
        <CodePane {...codeProps} lang="javascript" source={`
{
  "id": "roads-all",
  "type": "line",
  "source": "mySource",
  "source-layer": "road",
  "paint": {
    "line-color": "#000"
  }
}
`}/>
        <Text>Les routes</Text>
        <Notes/>
      </Slide>

      <Slide {...slideProps}>
          <Mapboxgl style={styles_ex.lignes_labels}/>
          <Heading size={5} textColor="secondary">Style</Heading>
          <Heading size={3}>Calques</Heading>
          <Text>Lignes, étiquettes</Text>
          <CodePane {...codeProps} lang="javascript" source={`
{
  "type": "symbol",
  "layout": {
    "text-size": 12,
    "text-max-angle": 30,
    "symbol-spacing": 250,
    "symbol-placement": "line",
    "text-padding": 1,
    "text-rotation-alignment": "map",
    "text-field": "{name_en}",
    "text-letter-spacing": 0.01
  },
  ...
}
`}/>
          <Text>Les routes</Text>
          <Notes/>
        </Slide>

        <Slide {...slideProps}>
          <Mapboxgl style={styles_ex.points}/>
          <Heading size={5} textColor="secondary">Style</Heading>
          <Heading size={3}>Calques</Heading>
          <Text>Points, symboles</Text>
          <CodePane {...codeProps} lang="javascript" source={`
{
"type": "symbol",
"source-layer": "place_label",
"layout": {
  "text-field": "{name_en}",
  ...
},
"paint": {
  "text-color": "hsl(0, 0%, 0%)",
  ...
}
}
`}/>
        <Notes/>
      </Slide>

      <Slide {...slideProps}>
        <Heading size={5} textColor="secondary">Style</Heading>
        <Heading size={3}>Calques</Heading>
        <Text>Briques 'basiques' à empiler</Text>
        <Text>Environ 200 pour faire un style complet</Text>
        <Notes>
          * Pas satisfaits des outils visuels<br/>
          * Créé une API simple en JS pour générer des styles<br/>
        </Notes>
      </Slide>

      { /******************************************************************************/ }

      <Slide {...slideProps}>
      <Mapboxgl flyTo={location_nantes} style={style_streets}/>
      <Heading size={5} textColor="secondary">mapboxgl</Heading>
      <Heading size={3}>Performant</Heading>
      <Text>WebGL</Text>
      <Text>Web-Workers</Text>
      <Text>Algorithmes</Text>
      <Notes/>
    </Slide>

    <Slide {...slideProps}>
      <Heading size={5} textColor="secondary">mapboxgl</Heading>
      <Heading size={3}>Algorithmes</Heading>
      <Appear>
        <Text>Gestion des 'collisions' entre symboles</Text>
      </Appear>
      <Appear>
        <Text>Placement des textes sur les formes</Text>
      </Appear>
      <Appear>
        <Text>Triangulation polygones</Text>
      </Appear>
      <Appear>
        <Text>webgl - lignes épaisses</Text>
      </Appear>
      <Notes/>
    </Slide>

      <Slide {...slideProps}>
        <Mapboxgl flyTo={location_mgdesign}/>
        <Heading size={5} textColor="secondary">mapboxgl</Heading>
        <Heading size={3}>Notre utilisation</Heading>
        <Text>Offline (self-hosted)</Text>
        <Text>Données custom</Text>
        <Text>Styles custom</Text>
        <Text>Mélangé à de la 3D</Text>
        <Notes/>
      </Slide>

      <Slide {...slideProps}>
      <Image src={images.mgdesign_lnpn.replace('/', '')} width="95%"/>
    </Slide>

      <Slide {...slideProps}>
        <Image src={images.mgdesign_altimetrie.replace('/', '')} width="95%"/>
      </Slide>

      <Slide {...slideProps}>
        <Image src={images.mgdesign_vendome.replace('/', '')} width="95%"/>
      </Slide>

      <Slide {...slideProps}>
      <Heading size={5} textColor="secondary">mapboxgl</Heading>
      <Heading size={3}>Alternatives</Heading>
      <List>
        <ListItem>Tangram, par mapzen</ListItem>
        <ListItem>OpenLayers</ListItem>
      </List>
      <Notes>
      * Tangram = animations, jeune<br/>
      * OpenLayers = serieux, trop ?<br/>
      </Notes>
    </Slide>

    <Slide {...slideProps}>
        <Heading size={5} textColor="secondary">mapboxgl</Heading>
        <Heading size={3}>Surcouches</Heading>
        <List>
          <ListItem>Deck.gl, par uber</ListItem>
        </List>
        <Notes>
        </Notes>
      </Slide>

    <Slide {...slideProps}>
      <Mapboxgl flyTo={location_nz}/>
        <Heading size={3}>Merci !</Heading>
        <Notes>
        * Recrutement !!<br/>
        </Notes>
      </Slide>

    <Slide/>

  { /******************************************************************************/ }
      
      </Deck>
    );
  }
}
