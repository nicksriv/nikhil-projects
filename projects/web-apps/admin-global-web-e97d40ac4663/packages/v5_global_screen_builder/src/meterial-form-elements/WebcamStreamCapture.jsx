/* eslint-env browser */
import { Button } from '@material-ui/core';
import React from 'react';

const videoType = 'video/webm';

export default class WebcamStreamCapture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recording: false,
            capturedVideo: "",
            vdoFileObj: null
        };
    }

    async componentDidMount() {
        if (!this.props.isVideoUpload) {
            try{
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                // show it to user
                this.video.srcObject = stream;
                this.video.play();
                // init recording
                this.mediaRecorder = new MediaRecorder(stream, {
                    mimeType: videoType,
                });
                // init data storage for video chunks
                this.chunks = [];
                // listen for data from media recorder
                this.mediaRecorder.ondataavailable = e => {
                    if (e.data && e.data.size > 0) {
                        this.chunks.push(e.data);
                    }
                };
            } catch(err){
                const stream=null;
                console.log("2")
                this.video.srcObject = stream;
            }
        }
    }

    startRecording(e) {
        e.preventDefault();
        // wipe old data chunks
        this.chunks = [];
        // start recorder with 10ms buffer
        this.mediaRecorder.start(10);
        // say that we're recording
        this.setState({ recording: true });
        this.setState({ vdoFileObj: "" })
    }

    stopRecording(e) {
        e.preventDefault();
        // stop the recorder
        this.mediaRecorder.stop();
        // say that we're not recording
        this.setState({ recording: false });
        // save the video to memory
        this.saveVideo()
    }

    saveVideo() {
        // convert saved chunks to blob
        const blob = new Blob(this.chunks, { type: videoType });
        // generate video url from blob
        const videoURL = window.URL.createObjectURL(blob);
        // append videoURL to list of saved videos for rendering
        this.setState({ capturedVideo: videoURL });
    }
    saveCapturedVideo() {
        if (this.props.isVideoUpload) {
            this.props.customOptions.recordedVideo = this.state.vdoFileObj.videoSrc;
            this.props.isModalOpen(false);
        } else {

            this.setState({ recording: false });
            this.props.customOptions.recordedVideo = this.state.capturedVideo;
            this.props.isModalOpen(false);
        }
    }
    handleVideoUpload = (clickSource, e) => {
        const self = this;
        const target = e.target;
        let file; let reader;

        if (target != undefined && target.files && target.files.length) {
            file = target.files[0];
            reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const videoSrc = reader.result;
                file.videoSrc = videoSrc;
                this.setState({ vdoFileObj: file })
                this.setState({ capturedVideo: "" })
            };
        }
    }

    async deleteVideo(e) {
        // filter out current videoURL from the list of saved videos
        this.setState({ capturedVideo: "" })
        this.setState({ vdoFileObj: "" })
        if (!this.props.isVideoUpload) {

            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
            // show it to user
            this.video.srcObject = stream;
            this.video.play();
            // init recording
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: videoType,
            });
            // init data storage for video chunks
            this.chunks = [];
            // listen for data from media recorder
            this.mediaRecorder.ondataavailable = e => {
                if (e.data && e.data.size > 0) {
                    this.chunks.push(e.data);
                }
            };
        }
    }

    render() {
        const { recording, videos, capturedVideo, vdoFileObj } = this.state;

        return (
            capturedVideo ? <>
                <video style={{ width: 400 }} src={capturedVideo} autoPlay loop />
                <Button fullWidth variant="contained" color="primary" onClick={(e) => this.deleteVideo(e)} style={{ marginTop: '10px' }}> Delete </Button>
                <Button fullWidth variant="contained" color="primary" onClick={(e) => this.saveCapturedVideo(e)} style={{ marginTop: '10px' }}>Save</Button>
            </> : vdoFileObj ?
                <>
                    <video style={{ width: 400 }} src={vdoFileObj.videoSrc} autoPlay loop />
                    <Button fullWidth variant="contained" color="primary" onClick={(e) => this.deleteVideo(e)} style={{ marginTop: '10px' }}> Delete </Button>
                    <Button fullWidth variant="contained" color="primary" onClick={(e) => this.saveCapturedVideo(e)} style={{ marginTop: '10px' }}>Save</Button>
                </> :
                this.props.isVideoUpload ? <>
                    <Button
                        color='primary'
                        variant='contained'
                        component='label'
                        disableElevation
                        style={{ color: '#FFFFFF' }}
                    // className={classname}
                    >
                        {"Choose Video to Upload"}
                        <input
                            type='file'
                            accept={'video/*'}
                            hidden
                            onChange={(e) => this.handleVideoUpload("isVideoUpload", e)}
                        />
                    </Button>
                </> :
                    <div className="camera">
                        <video
                            style={{ width: 400 }}
                            ref={v => {
                                this.video = v;
                            }}>
                            Video stream not available.
                        </video>
                        <div>
                            {!recording && <Button fullWidth variant="contained" color="primary" onClick={e => this.startRecording(e)} style={{ marginTop: '10px' }}> Start Capture </Button>}
                            {recording && <Button fullWidth variant="contained" color="primary" onClick={e => this.stopRecording(e)} style={{ marginTop: '10px' }}> Stop Capture </Button>}
                        </div>
                    </div>
        );
    }
}