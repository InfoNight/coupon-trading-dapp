import { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { 
    Header,
    Segment,
    Icon,
    Button
 } from "semantic-ui-react";

const CouponDropzone = ({onChangeImage}) => {
    const onDrop = useCallback(
        (files) => {
            onChangeImage(files[0]);
        },
        [onChangeImage]
      );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}>
            <Segment placeholder>
                <Header icon>
                <Icon name='file image outline' />
                Drag and drop an image here or click to select an image
                </Header>
                <Button primary>Add Image</Button>
                <input {...getInputProps()} />
            </Segment>
        </div>
    )
}

export default CouponDropzone;