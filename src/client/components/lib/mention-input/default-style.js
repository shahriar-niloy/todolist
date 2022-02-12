export default {
    control: {
      backgroundColor: "#fff",
      fontSize: 14,
      fontWeight: "normal",
      maxHeight: '100px'
    },
  
    highlighter: {
      overflow: "hidden"
    },
  
    input: {
      margin: 0
    },
  
    "&singleLine": {
      control: {
        display: "inline-block",
  
        width: 130
      },
  
      highlighter: {
        padding: 1,
        border: "2px inset transparent"
      },
  
      input: {
        padding: 1,
  
        border: "2px inset"
      }
    },
  
    "&multiLine": {
      control: {
        border: "1px solid silver"
      },
  
      highlighter: {
        padding: 9,
        maxHeight: '100px'
      },
  
      input: {
        padding: 9,
        outline: 0,
        border: 0,
        overflow: 'auto',
        position: 'absolute',
        bottom: 14,
      }
    },
  
    suggestions: {
      list: {
        backgroundColor: '#282828',
        padding: '5px',
        minWidth: '200px',
        fontSize: 14
      },
  
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
  
        "&focused": {
          backgroundColor: "#363636"
        }
      }
    }
  };
  