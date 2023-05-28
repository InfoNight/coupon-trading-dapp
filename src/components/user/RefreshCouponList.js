import { useEffect, useState } from "react";
import {
    Input,
    Form,
    Icon,
    Header,
    Button,
    Modal,
    TextArea,
    Image
  } from 'semantic-ui-react'

const RefreshCouponList = ({refreshCallback}) => {
    const [hovered, setHovered] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(async () => {
    }, []);

    const onRefreshPressed = async () => {
        setLoading(true);
        refreshCallback();
        setLoading(false);
    };

    return (
        <Icon.Group size='large'
            onMouseOver={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ cursor: 'grabbing' }}
            onClick={() => onRefreshPressed()}
        >
            {loading ? (
                <Icon loading color='grey' name='spinner' />
            ) : hovered ? (
                <Icon loading color='grey' name='redo alternate' />
            ) : (
                <Icon color='grey' name='redo alternate' />
            )}
        </Icon.Group>
    );
}

export default RefreshCouponList;