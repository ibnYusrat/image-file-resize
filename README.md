# client-side-image-resize 
 
This project is a fork of https://www.npmjs.com/package/image-file-resize.

This node module to resize the image file according to width and height. Also you can change the extension of a file. And also it is very **lightweight**.

> [Live demo](https://react-rggk21.stackblitz.io/)

## Install

```sh
npm install client-side-image-resize --save
```
## Examples of how to use it

```javascript
    import convert from 'client-side-image-resize';

    convert({ 
        file: e.target.files[0],  
        width: 600, 
        height: 400, // You can ommit width or height and it will resize proportionally.
        type: 'jpeg'
        }).then(resp => {
            // Response contain compressed and resized file
        }).catch(error => {
             // Error
        })
```

## Parameter to send
 Object need to send as a parameter and contain these data.

| Key | Required/Optional | Description |
| --- | --- | --- |
| `file` | **Required** | Contain browser file object. |
| `width` | Optional | Width of image required **Default is auto** |
| `height` | Optional | Height of image required **Default is auto** |
| `type` | Optional | Type of image required **Default is jpeg** |

Remember: one of width or height is required.

You can convert image only in **jpg, gif, bmp, png, jpeg**.
