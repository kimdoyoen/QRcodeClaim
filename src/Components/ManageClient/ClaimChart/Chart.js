import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';

import { ChartContainerDiv } from "../ManageClientCSS.js";

function Chart(props) {

    useEffect(() => {
        console.log(props.Data)
    }, [props.Data])
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

    const MyResponsiveBar = (data) => (
        <ResponsiveBar
            data={data}
            keys={[ '미처리', '처리 중', '보류', '처리 완료' ]}
            indexBy="type"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.55}
            layout="vertical"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            borderColor={{ from: 'color', modifiers: [ [ 'darker', '1.4' ] ] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 10,
                legend: '카테고리',
                legendPosition: 'left',
                legendOffset: 32
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '접수 (건)',
                legendPosition: 'top',
                legendOffset: -40
            }}
            enableGridX={false}
            enableGridY={true}
            labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            isFocusable={true}
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
        />
    );

    const MyResponsiveLine = (data) => (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 10,
                legend: '카테고리',
                legendOffset: 40,
                legendPosition: 'left'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 0,
                tickPadding: 14,
                tickRotation: -90,
                legend: '처리율 (%)',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            enableGridX={false}
            lineWidth={10}
            pointSize={14}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor', modifiers: [] }}
            enablePointLabel={true}
            pointLabel="y"
            pointLabelYOffset={5}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    );

    return (
        <>
        <ChartContainerDiv>
            <h1>접수 (건)</h1>
            {MyResponsiveBar(props.Data)}
        </ChartContainerDiv>
        <ChartContainerDiv>
            <h1>처리율 (%)</h1>
            {MyResponsiveLine(props.Percentage)}
        </ChartContainerDiv>
        </>
    )
}

export default Chart
