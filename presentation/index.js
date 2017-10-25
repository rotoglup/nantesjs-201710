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
};

preloader(images);

let theme = createTheme({
  primary: "white",
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
  zoom: 1.01
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
  zoom: 18.0,
  bearing: 0
}

const location_mapbox = {
  center: [-122.3999209, 37.7884401],
  zoom: 19.0,
  bearing: 0
}

const style_streets = 'mapbox://styles/mapbox/streets-v9';
const style_basic = 'mapbox://styles/mapbox/basic-v9';
const style_dark = 'mapbox://styles/mapbox/dark-v9';
const style_default = style_streets;

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

    const slideProps = { transition: ["fade"] }

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
          <CodePane source='void hello(char const* world) { printf("Hello %s", world); }'></CodePane>
          <CodePane source='def hello(world): print "Hello %s" % world'></CodePane>
          <CodePane source='function hello(world) { console.log(`Hello ${world}`); }'></CodePane>
          <Appear>
            <Image src={images.logo_mgd.replace('/', '')} width="60%"/>
          </Appear>
        </Slide>
        

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_world}/>
          <Heading size={3}>Pourquoi mapboxgl ?</Heading>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_google}/>
          <Heading size={3}>vs. Google (Maps)</Heading>
          <Appear>
            <Heading size={5}>Your API will be deprecated very soon</Heading>
          </Appear>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_mapbox}/>
          <Heading size={3}>mapbox(gl)</Heading>
        </Slide>

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_world} showTileBoundaries={true}/>
          <Heading size={3}>L'important, c'est la tuile</Heading>
          <Image src={images.tiles_schema.replace('/', '')} width="80%"/>
          <Text>quadtree</Text>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl style={style_raster} showTileBoundaries={true}/>
          <Heading size={3}>Tuiles "raster"</Heading>
          <Text>JPG, PNG, 256x256</Text>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl style={style_default} showTileBoundaries={true}/>
          <Heading size={3}>Tuiles "vecteur"</Heading>
          <Text>GeoJSON, TopoJSON, 'MVT', ...</Text>
          <Image src={images.vector_tile_example.replace('/', '')} width="60%"/>
        </Slide>
        <Slide {...slideProps}>
          <Mapboxgl flyTo={location_nantes} style={style_default}/>
          <Heading size={3}>Tuiles "vecteur"</Heading>
          <Heading size={4} textColor="tertiary">avantages</Heading>
          <Image src={images.raster_vs_vector.replace('/', '')} width="30%"/>
          <Text/>
          <Appear><div>
            <Image src={images.balance.replace('/', '')} width="15%"/>
            <Text/>
          </div></Appear>
            <Appear><div>
            <Image src={images.chrono.replace('/', '')} width="15%"/>
          </div></Appear>
        </Slide>

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Heading size={3}>Un peu de contexte</Heading>
          <Heading size={4} textColor="tertiary">mapbox, sans gl</Heading>
          <Image src={images.mapbox.replace('/', '')} width="25%"/>
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
        </Slide>
        
        <Slide {...slideProps}>
          <Heading size={3}>mapbox</Heading>
          <Heading size={5} textColor="tertiary">Beaucoup de code</Heading>
          <Image src={images.github.replace('/', '')} width="25%"/>
        </Slide>

      { /******************************************************************************/ }

        <Slide {...slideProps}>
          <Heading size={3}>mapbox*gl*</Heading>
          <Heading size={4} textColor="tertiary">enfin !</Heading>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={3}>API de carto 'classique'</Heading>
          <Appear><div>
            <Text>Contrôle du point de vue</Text>
          </div></Appear>
          <Appear><div>
            <Text>Marqueurs et popups</Text>
          </div></Appear>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={3}>Spécification de style</Heading>
          <Text>Ouverte</Text>
          <Text>Sur ... github</Text>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={3}>Exemples</Heading>
          <Text>Sources</Text>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={3}>Exemples</Heading>
          <Text>Points, symboles</Text>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={3}>Exemples</Heading>
          <Text>Lignes</Text>
        </Slide>

        <Slide {...slideProps}>
          <Heading size={3}>Exemples</Heading>
          <Text>Polygones</Text>
        </Slide>

      { /******************************************************************************/ }

        <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="tertiary">Mapbox</Heading>
          <Appear>
            <Heading size={6} textColor="secondary">Fullstack</Heading>
          </Appear>
          <Appear>
            <Heading size={4} textColor="secondary">Données</Heading>
          </Appear>
          <Appear>
            <Heading size={4} textColor="secondary">Styles</Heading>
          </Appear>
          <Appear>
            <Heading size={4} textColor="secondary">Outils</Heading>
          </Appear>
          <Appear>
            <Heading size={4} textColor="secondary">API</Heading>
          </Appear>
        </Slide>

      <Slide transition={["fade"]} bgColor="primary">
          <Heading size={3} textColor="tertiary">MapboxGL</Heading>
          <Appear>
            <Heading size={4} textColor="secondary">Ouvert</Heading>
          </Appear>
          <Appear>
            <BlockQuote>
              <Quote>Your API will be deprecated very soon</Quote>
              <Cite>Google</Cite>
            </BlockQuote>
          </Appear>
          <Appear>
            <Heading size={4} textColor="secondary">WebGL</Heading>
          </Appear>
        </Slide>

      <Slide transition={["fade"]} bgColor="primary">
          <Heading size={6} textColor="primary" caps>Typography</Heading>
          <Heading size={1} textColor="secondary">Heading 1</Heading>
          <Heading size={2} textColor="secondary">Heading 2</Heading>
          <Heading size={3} textColor="secondary">Heading 3</Heading>
          <Heading size={4} textColor="secondary">Heading 4</Heading>
          <Heading size={5} textColor="secondary">Heading 5</Heading>
          <Text size={6} textColor="secondary">Standard text</Text>
        </Slide>

        <Slide transition={["fade"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
        </Slide>

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
