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
  logo_mgd: require("../assets/logo_mgd_v5.png")
};

preloader(images);

const theme = createTheme({
  primary: "white",
  secondary: "#1F2022",
  tertiary: "#03A9FC",
  quartenary: "#CECECE"
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
  zoom: 1
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

const style_default = 'mapbox://styles/mapbox/streets-v9';

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
    return (
      <Deck transition={["zoom", "slide"]} transitionDuration={500} theme={theme}>

        <Slide transition={["zoom"]} bgColor="primary">
          <Heading size={1} fit caps lineHeight={1} textColor="secondary">
            Promenade au pays de la carto
          </Heading>
          <Text margin="10px 0 0" textColor="tertiary" size={1} bold>
            mapboxgl
          </Text>
          <Mapboxgl flyTo={location_nantes}/>
        </Slide>

        <Slide transition={["fade"]}>
          <Image src={images.logo_mgd.replace('/', '')} width="80%"/>
          <Heading size={3} textColor="secondary">Nicolas Lelong</Heading>
          <CodePane lang='javascript' source='function toto() {}'></CodePane>
          <Mapboxgl flyTo={location_mgdesign}/>
        </Slide>

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
