Ext.define("south_linegraph",{
    extend: "Ext.chart.CartesianChart",
    store: Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1' ],
            data: [
                { month: 'Jan', data1: 20 },
                { month: 'Feb', data1: 20 },
                { month: 'Mar', data1: 19 },
                { month: 'Apr', data1: 18 },
                { month: 'May', data1: 18 },
                { month: 'Jun', data1: 17 },
                { month: 'Jul', data1: 16 },
                { month: 'Aug', data1: 16 },
                { month: 'Sep', data1: 16 },
                { month: 'Oct', data1: 16 },
                { month: 'Nov', data1: 15 },
                { month: 'Dec', data1: 15 }
            ]
        }),
    insetPadding: 40,
    innerPadding: {
        left: 40,
        right: 40
    },
    sprites: [{
        type: 'text',
        text: 'Line Charts - Basic Line',
        font: '22px Helvetica',
        width: 100,
        height: 30,
        x: 40, // the sprite x position
        y: 20  // the sprite y position
    }, {
        type: 'text',
        text: 'Data: Browser Stats 2012',
        font: '10px Helvetica',
        x: 12,
        y: 470
    }, {
        type: 'text',
        text: 'Source: http://www.w3schools.com/',
        font: '10px Helvetica',
        x: 12,
        y: 480
    }],
    axes: [{
        type: 'numeric',
        fields: 'data1',
        position: 'left',
        grid: true,
        minimum: 0,
        maximum: 24,
        renderer: function (v) { return v + '%'; }
    }, {
        type: 'category',
        fields: 'month',
        position: 'bottom',
        grid: true,
        label: {
            rotate: {
                degrees: -45
            }
        }
    }],
    series: [{
        type: 'line',
        xField: 'month',
        yField: 'data1',
        style: {
            lineWidth: 4
        },
        marker: {
            radius: 4
        },
        label: {
            field: 'data1',
            display: 'over'
        },
        highlight: {
            fillStyle: '#000',
            radius: 5,
            lineWidth: 2,
            strokeStyle: '#fff'
        },
        tooltip: {
            trackMouse: true,
            style: 'background: #fff',
            showDelay: 0,
            dismissDelay: 0,
            hideDelay: 0,
            renderer: function(storeItem, item) {
                this.setHtml(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
            }
        }
    }]

});