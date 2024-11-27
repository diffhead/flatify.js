# Flatify.js

> This is the simple library for flatifying the objects,
> converting them to form string and search params.

## Usage

#### Installation

    npm install flatify.js

#### Import

```javascript
import { FlatifyJS } from 'flatify.js'
```

#### Prepare object

```javascript
const object = {
    text: 'Hello, it`s just a text',
    object: {
        text: {
            content: 'Hello it`s just a deep text',
            settings: {
                font: {
                    name: 'Ubuntu',
                    type: 'Regular',
                    size: '12px',
                    wight: 500
                }
            }
        }
    }
};
```

#### Interact with FlatKeyValueObject

```javascript
/**
 * @type FlatKeyValueObject
 *
 * FlatKeyValueObject {
 *   object: {
 *       'text': 'Hello, its just a text',
 *       'object.text.content': 'Hello, its an object text',
 *       'object.text.settings.font.name': 'Ubuntu',
 *       'object.text.settings.font.type': 'Regular',
 *       'object.text.settings.font.size': '12px',
 *       'object.text.settings.font.weight': '500'
 *   }
 * }
*/
const flat = FlatifyJS.toFlatKeyValueObject(object);

/**
 * @type string[]
 *
 * [
 *    'text',
 *    'object.text.content',
 *    'object.text.settings.font.name',
 *    'object.text.settings.font.type',
 *    'object.text.settings.font.size',
 *    'object.text.settings.font.weight'
 * ]
 */
const keys = flat.keys();

/**
 * @type number
 */
const value = flat.value('object.text.settings.font.weight');
```

#### Convert it

```javascript
/**
 * @type string
 *
 * data[text]=Hello, its just a text&data[object][text][content]=Hello, its an object text&
 * data[object][text][settings][font][name]=Ubuntu&data[object][text][settings][font][type]=Regular&
 * data[object][text][settings][font][size]=12px&data[object][text][settings][font][weight]=500
 */
const formString = FlatifyJS.toFormString(object, 'data');

/**
 * @type URLSearchParams
 *
 * URLSearchParams {
 *   'data[text]' => 'Hello, its just a text',
 *   'data[object][text][content]' => 'Hello, its an object text',
 *   'data[object][text][settings][font][name]' => 'Ubuntu',
 *   'data[object][text][settings][font][type]' => 'Regular',
 *   'data[object][text][settings][font][size]' => '12px',
 *   'data[object][text][settings][font][weight]' => '500'
 * }
 */
const urlParams = FlatifyJS.toUrlSearchParams(object, 'data');
```
