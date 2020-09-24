import { StyleSheet } from 'react-native';

const SPACER = 16;
const BORDER_RADIUS = 8;

export default StyleSheet.create({
  row: {
    flex: 0,
    flexBasis: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
    flexBasis: 0,
    flexGrow: 1,
    maxWidth: '100%',
  },

  // Padding
  p1: {
    padding: SPACER * .25,
  },
  p2: {
    padding: SPACER * .5,
  },
  p3: {
    padding: SPACER,
  },
  p4: {
    padding: SPACER * 1.5,
  },
  p5: {
    padding: SPACER * 3,
  },

  py1: {
    paddingTop: SPACER * .25,
    paddingBottom: SPACER * .25,
  },
  py2: {
    paddingTop: SPACER * .5,
    paddingBottom: SPACER * .5,
  },
  py3: {
    paddingTop: SPACER,
    paddingBottom: SPACER,
  },
  py4: {
    paddingTop: SPACER * 1.5,
    paddingBottom: SPACER * 1.5,
  },
  py5: {
    paddingTop: SPACER * 3,
    paddingBottom: SPACER * 3,
  },


  pb1: {
    paddingBottom: SPACER * .25,
  },
  pb2: {
    paddingBottom: SPACER * .5,
  },
  pb3: {
    paddingBottom: SPACER,
  },
  pb4: {
    paddingBottom: SPACER * 1.5,
  },
  pb5: {
    paddingBottom: SPACER * 3,
  },

  // Margin
  m1: {
    margin: SPACER * .25,
  },
  m2: {
    margin: SPACER * .5,
  },
  m3: {
    margin: SPACER,
  },
  m4: {
    margin: SPACER * 1.5,
  },
  m5: {
    margin: SPACER * 3,
  },
  mb1: {
    marginBottom: SPACER * .25,
  },
  mb2: {
    marginBottom: SPACER * .5,
  },
  mb3: {
    marginBottom: SPACER,
  },
  mb4: {
    marginBottom: SPACER * 1.5,
  },
  mb5: {
    marginBottom: SPACER * 3,
  },


  // Text
  text: {
    fontSize: SPACER,
  },
  textMuted: {
    color: 'gray',
  },
  textCenter: {
    textAlign: 'center',
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
  },

  // Border Radius
  rounded: {
    borderRadius: BORDER_RADIUS,
  },

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: BORDER_RADIUS,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Background
  bgWhite: {
    backgroundColor: 'white',
  },
});
