import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'

const CouponDropzone = ({onChangeImage}) => {
    const onDrop = useCallback(
        (files) => {
            console.log(files[0]);
            onChangeImage(files[0]);
        },
        [onChangeImage]
      );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop an image here or click to select an image</p>
        </div>
    )
}

export default CouponDropzone;