import React from 'react';
import Button from "@material-ui/core/Button";

export default class ButtonRadiosOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            element: this.props.element,
            data: this.props.data,
            dirty: false,
        };
    }


    displayImage = (e) => {
        const this_element = this.state.element;
        const self = this;
        const target = e.target;
        let file; let
            reader;

        if (target.files && target.files.length) {
            file = target.files[0];
            // eslint-disable-next-line no-undef
            reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onloadend = async () => {
                const imageSrc = reader.result;
                file.imageSrc = imageSrc;
                let uri = imageSrc;
                if (this.props.imageUploadCallback != null) {
                    const awsS3uri = await this.props.imageUploadCallback(imageSrc);
                    uri = awsS3uri;
                }
                this_element.customOptions.imageFile = uri;
                self.setState({
                    element: this_element,
                    dirty: true,
                });
            };
        }
    };

    clearImage = () => {
        const this_element = this.state.element;
        this_element.customOptions.imageFile = null;
        this.setState({
            element: this_element,
            dirty: true,
        });
    };

    updateOption() {
        const this_element = this.state.element;
        // to prevent ajax calls with no change
        if (this.state.dirty) {
            this.props.updateElement.call(this.props.preview, this_element);
            this.setState({ dirty: false });
        }
    }

    render() {
        const fileInputStyle = this.props.element.customOptions.imageFile ? { display: 'none' } : null;
        if (this.state.dirty) {
            this.state.element.dirty = true;
        }
        return (
            <React.Fragment>
                <label htmlFor="limitRange">Heading Image</label> <br />
                <div style={fileInputStyle}>
                    <br></br>
                    <Button
                        color='primary'
                        variant='contained'
                        component='label'
                        disableElevation
                        style={{ color: '#FFFFFF' }}
                    // className={classname}
                    >
                        {"Choose Image to Upload"}
                        <input
                            type='file'
                            accept={'image/*'}
                            hidden
                            onChange={this.displayImage}
                            onBlur={this.updateOption}
                        />
                    </Button>
                </div>
                {this.props.element.customOptions != undefined && this.props.element.customOptions.imageFile &&
                    <div>
                        <img src={this.props.element.customOptions.imageFile} height="100" className="image-upload-preview" /><br />
                        <div className="btn btn-image-clear" onClick={this.clearImage}>
                            <i className="fas fa-times"></i> Clear Photo
                        </div>
                    </div>
                }
            </React.Fragment>

        )
    }
}
