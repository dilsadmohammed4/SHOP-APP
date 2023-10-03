import React, {useEffect, useRef} from "react";
import {MainNavbar} from "../../../layouts/pages/navbar/MainNavbar";
import {LayoutHeading} from "../../../layouts/components/layout-heading/LayoutHeading";
import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import * as userReducer from "../../../../redux/user/user.slice";
import * as userAction from "../../../../redux/user/user.action";
import {useSelector} from "react-redux";
import {AppDispatch, RootState, useAppDispatch} from "../../../../redux/store";
import {Link} from "react-router-dom";

declare const window: Window &
    typeof globalThis & {
    cloudinary: {
        createUploadWidget: (p: {}, p1: (error: any, result: any) => void) => any
    }
}

export const UserProfile: React.FC = () => {
    const userState: userReducer.InitialState = useSelector((store: RootState) => {
        return store[userReducer.userFeatureKey];
    })
    const cloudinaryRef = useRef<any>();
    const widgetRef = useRef<any>();
    const dispatch: AppDispatch = useAppDispatch();
    useEffect(() => {
        dispatch(userAction.getAddressInfoAction())
    }, []);
    const clickDeleteAddress = (addressId: string | undefined) => {

        if (addressId) {
            dispatch(userAction.deleteAddressAction({addressId: addressId}))
        }
    }

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        }, (error: any, result: { event: string; info: { secure_url: any; }; }) => {
            if (!error && result && result.event === "success") {
                const imageUrl = result.info.secure_url;
                dispatch(userAction.updateProfilePictureAction({imageUrl: imageUrl}))
            }
        })
    }, []);

    const clickEditImage = () => {
        widgetRef.current.open();
    }
    const {user, address, loading} = userState;
    return (
        <>
            <MainNavbar/>
            <LayoutHeading icon={"bi-person-fill"} heading={'Profile'}/>
            {/*{loading && <SpinnerUI/>}*/}
            <Container>
                <Row>
                    <Col xs={2}>
                        <Card>
                            <Card.Header className="text-center bg-warning">
                                <p className="h4">Profile</p>
                            </Card.Header>
                            <Card.Body>
                                <img alt="" className="img-fluid"
                                     src={user.imageUrl} style={{ height: '200px', width: '300px' }} />
                                <div className="d-grid mt-3">
                                    <Button type="button" variant={"warning"} onClick={clickEditImage}><i
                                        className="bi bi-pencil-square"></i> Edit</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={5}>
                        <Card>
                            <Card.Header className="bg-primary">
                                <p className="h4 text-white">Your Information</p>
                            </Card.Header>
                            <Card.Body>
                                <ListGroup>
                                    <ListGroup.Item>Name: <span
                                        className="fw-bold">{user.username}</span></ListGroup.Item>
                                    <ListGroup.Item>Email: <span
                                        className="fw-bold">{user.email}</span></ListGroup.Item>
                                    <ListGroup.Item>Admin: <span
                                        className="fw-bold">{user.isAdmin ? "YES" : "NO"}</span></ListGroup.Item>
                                    <ListGroup.Item>Super Admin: <span
                                        className="fw-bold">{user.isSuperAdmin ? "YES" : "NO"}</span></ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={5}>
                        <Card>
                            <Card.Header className="bg-success">
                                <div className="d-flex justify-content-between">
                                    <p className="text-white h4">Shipping Address</p>
                                    <div>
                                        {
                                            address && Object.keys(address).length > 0 ?
                                                <>
                                                    <Link to={`/users/edit-shipping-address/${address._id}`}>
                                                        <Button variant={"primary"} className="me-2">
                                                            <i className="bi bi-pencil-fill text-white"></i>
                                                        </Button>
                                                    </Link>
                                                    <Button variant={"danger"} className="me-2"
                                                            onClick={() => clickDeleteAddress(address._id)}>
                                                        <i className="bi bi-trash-fill text-white"></i>
                                                    </Button>
                                                </> : <>
                                                    <Link to={`/users/add-shipping-address`}>
                                                        <Button variant={"warning"} className="me-2">
                                                            <i className="bi bi-plus-circle-fill text-white"></i>
                                                        </Button>
                                                    </Link>
                                                </>
                                        }
                                    </div>
                                </div>
                            </Card.Header>
                            {
                                address && Object.keys(address).length > 0 &&
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>Mobile: <span
                                            className="fw-bold">{address.mobile}</span></ListGroup.Item>
                                        <ListGroup.Item>Flat: <span
                                            className="fw-bold">{address.flat}</span></ListGroup.Item>
                                        <ListGroup.Item>Street: <span
                                            className="fw-bold">{address.street}</span></ListGroup.Item>
                                        <ListGroup.Item>Landmark: <span
                                            className="fw-bold">{address.landmark}</span></ListGroup.Item>
                                        <ListGroup.Item>City: <span
                                            className="fw-bold">{address.city}</span></ListGroup.Item>
                                        <ListGroup.Item>State: <span
                                            className="fw-bold">{address.state}</span></ListGroup.Item>
                                        <ListGroup.Item>Country: <span
                                            className="fw-bold">{address.country}</span></ListGroup.Item>
                                        <ListGroup.Item>Pincode: <span
                                            className="fw-bold">{address.pinCode}</span></ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};