import React from 'react';
import { Grid, Card, CardContent } from '@material-ui/core';
import ComponentHeader from '../form-elements/component-header';

const TilesThemeColorEnum = {
    CUSTOM: "custom",
    WHITE: "white",
    RED: "red",
    BLUE: "blue"
}
class Tiles extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        const propsData = this.props.data;
        let arrCards = [];
        if (propsData.customOptions.columns > 1) {
            let cols = 12 / propsData.customOptions.columns;
            for (let index = 0; index < propsData.customOptions.columns; index++) {
                arrCards.push({
                    xs: '12', sm: cols * 2, md: cols
                });
            }
        } else {
            arrCards.push({
                xs: '12', sm: '12', md: '12'
            });
        }

        return (
            <div className='SortableItem rfb-item'>
                <ComponentHeader {...this.props} />
                <div className="form-group">
                    <Grid container spacing={propsData.customOptions.spacing || 2}>
                        {
                            arrCards.map((c, i) => (
                                <Grid item xs={c.xs || 12} sm={c.sm || 12} md={c.md || 12}>
                                    <Card elevation={0} style={{
                                        backgroundColor: `${this.props.data
                                            && this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED ?
                                            "rgb(216, 67, 21)" :
                                            this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE ? "rgb(30, 136, 229)" :
                                                this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM ? this.props.data.customOptions.tileProperties[i].tilesRandomColor :
                                                    "#ffffff"}`,
                                                    border:"2px solid #D5D5D5"
                                    }}>
                                        <CardContent>
                                            <Grid container direction="column" alignItems="center"
                                                style={{
                                                    borderRadius: '5px',
                                                }}
                                            >
                                                <Grid item className="pt-3">
                                                    <h6 style={{
                                                        color: `${this.props.data
                                                            && (this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED
                                                                || this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE
                                                                || this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ?
                                                            "#ffffff" : "#9f9f9f"}`
                                                    }}>{`${this.props.data.customOptions.tileProperties[i].title ? this.props.data.customOptions.tileProperties[i].title : "Title Text"}`}</h6>
                                                </Grid>
                                                <Grid item>
                                                    <h3 style={{
                                                        color: `${this.props.data
                                                            && (this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.RED
                                                                || this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.BLUE
                                                                || this.props.data.customOptions.tileProperties[i].tilesColor === TilesThemeColorEnum.CUSTOM) ?
                                                            "#ffffff" : "#212121"}`
                                                    }}>
                                                        {/* {`${this.props.data.customOptions.tileProperties[i].rule === "static" ?
                                                            this.props.data.customOptions.tileProperties[i].textRule === "number" ?
                                                                (this.props.data.customOptions.tileProperties[i].numberTextValue || 0) :
                                                                this.props.data.customOptions.tileProperties[i].textRule === "text" ?
                                                                    this.props.data.customOptions.tileProperties[i].shortTextValue : "Text" : "Text"}`} */}
                                                        {this.props.data.customOptions.tileProperties[i].text ? this.props.data.customOptions.tileProperties[i].text : "Text"}
                                                    </h3>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div >
        );
    }
}
export default Tiles;