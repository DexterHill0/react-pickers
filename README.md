# react-pickers

> A responsive colour and gradient picker made in React

[![NPM](https://img.shields.io/npm/v/react-pickers.svg)](https://www.npmjs.com/package/@dexterhill0/react-pickers) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Demo

\<gif>

[Live Demo]()

## Install

```bash
npm install --save react-pickers
```

## Usage

```tsx
import React, { Component } from "react"

import { ReactColour, ReactGradient } from "react-pickers";

class Example extends Component {
  render() {
    return (
        <div>
            <ReactColour />
            <ReactGradient />
        </div>
    );
  }
}
```
*More examples can be found [here]()*

## Options



## Known Bugs:
* The mouse is not centred on the pointer when selecting a saturation.
* The checkerboard seems to bug out on FireFox.


## License

MIT © [DexterHill0](https://github.com/DexterHill0)
