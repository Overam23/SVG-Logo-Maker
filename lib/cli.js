// imported inquirer and node.js to be installed upon use
const inquirer = require('inquirer'); 
const fs = require('fs'); 
// asynch method to run CLI and prompts user for text and input
class CLI {
  async run() { 
    const text = await this.promptText(); 
    const textColor = await this.promptColor('Text'); 
    const shape = await this.promptShape(); 
    const shapeColor = await this.promptColor('Shape'); 
// generates the svg logo based off of user input and saves generated svg to logo.svg
    const svg = this.generateSVG(text, textColor, shape, shapeColor); 
    this.saveSVG(svg); 
// logs Generated logo.svg when prompt is completed
    console.log("Generated logo.svg");
  }
// prompts user for text input/color input and returns the text/color input by user
  async promptText() { 
    const response = await inquirer.prompt({ 
      type: 'input', 
      name: 'text', 
      message: 'Enter up to three characters for the text:' 
    });
    return response.text.substring(0, 3); 
  }

  async promptColor(item) { 
    const response = await inquirer.prompt({ 
      type: 'input', 
      name: 'color', 
      message: `Enter the color for ${item} (keyword or hexadecimal):`
    });
    return response.color; 
  }
// prompts user for shape and returns selected shape
  async promptShape() {
    const response = await inquirer.prompt({ 
      type: 'list', 
      name: 'shape', 
      message: 'Choose a shape:', 
      choices: ['circle', 'triangle', 'square'] 
    });
    return response.shape; //
  }
  // generates SVG logo based on user inputs, created shapeElement variable to hold svg logo and added const X and Y to position SVG logo horizontally and vertically when you go live for img
  generateSVG(text, textColor, shape, shapeColor) { 
    let shapeElement; 
    const centerX = 150; 
    const centerY = 100; 
// switch statements, depending which shape is chosen the chosen shape-shapeElement will run
    switch (shape) { 
      case 'circle': 
        shapeElement = `<circle cx="${centerX}" cy="${centerY}" r="50" fill="${shapeColor}" />`;
        break;
      case 'triangle': 
        shapeElement = `<polygon points="${centerX - 50},${centerY + 50} ${centerX},${centerY - 50} ${centerX + 50},${centerY + 50}" fill="${shapeColor}" />`; 
        break;
      case 'square': 
        shapeElement = `<rect x="${centerX - 50}" y="${centerY - 50}" width="100" height="100" fill="${shapeColor}" />`; // SVG rectangle (square) element
        break;
      default: 
        shapeElement = `<rect width="100%" height="100%" fill="${shapeColor}" />`; 
    }
// The SVG logo that is selected by user is set to a specific width, height and text size/color and returns the svg
    const svg = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg"> 
        ${shapeElement} 
        <text x="50%" y="50%" fill="${textColor}" font-size="48" text-anchor="middle" dominant-baseline="middle">${text}</text> 
      </svg>
    `;
    return svg; 
  }
// saves generated SVG logo to logo.svg file
  saveSVG(svg) { 
    fs.writeFileSync('logo.svg', svg);
  }
}
// exports CLI from index.js to be used
module.exports = CLI; 
