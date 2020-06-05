function render() {
    prepareData().then(function () {

        // !!!!!!!! Метод отвечающий за формирование данных необходимых конкретному компоненту
        var formattedData = formatData();

        chart.hideLoading();
        let option = {
            color: settings.lineColors,
            title: {
                show: settings.titleShow,
                text: settings.titleText,
                textStyle: {
                    color: settings.titleTextStyleColor,
                    fontStyle: settings.titleTextStyleFontStyle,
                    fontWeight: settings.titleTextStyleFontWeight,
                    fontFamily: settings.titleTextStyleFontFamily,
                    fontSize: settings.titleTextStyleFontSize
                }
            },
            //todo Formatter(params) по ID элемента массива серий(форматированного) formattedData.series, получать значения из массива data.tableData.series
            //!!!!!!!! Форматтер отвечающий за формирование тултипа

            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var customTooltip = '';
                    settings.tooltipDimensions.forEach(function (value, index) {
                        customTooltip += '<br>&nbsp;&nbsp;&nbsp;&nbsp;' + value + ':' + formattedData.unformatteData[params[0].dataIndex][value];
                        //console.log(params);


                    })
                    return '' + params[0].name + '<br>' + params[0].marker + params[0].seriesName + ': ' + params[0].value + customTooltip;
                }
            },

            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            legend: {
                show: settings.legendShow,
                itemGap: settings.legendTitleGap,
                data: formattedData.legendDataNames,
                textStyle: {
                    color: settings.legendTextStyleColor,
                    fontStyle: settings.legendTextStyleFontStyle,
                    fontWeight: settings.legendTextStyleFontWight,
                    fontFamily: settings.legendTextStyleFontFamily,
                    fontSize: settings.legendTextStyleFontSize
                }
            },
            grid: {
                top: settings.gridTop,
                left: settings.gridLeft,
                right: settings.gridRight,
                containLabel: settings.gridContainLabel
            },
            xAxis: [
                {
                    show: settings.xAxisShow,
                    type: 'category',
                    name: settings.xAxisName,
                    data: formattedData.xAxis,
                    nameTextStyle: {
                        color: settings.xAxisNameTextStyleColor,
                        fontStyle: settings.xAxisNameTextStyleFontStyle,
                        fontWeight: settings.xAxisNameTextStyleFontWeight,
                        fontFamily: settings.xAxisNameTextStyleFontFamily,
                        fontSize: settings.xAxisNameTextStyleFontSize,
                        align: settings.xAxisNameTextStyleAlign
                    },
                    axisLine: {
                        lineStyle: {
                            type: settings.xAxisLineStyleType,
                            color: settings.xAxisLineStyleColor
                        }
                    }
                }
            ],
            yAxis: [
                {
                    show: settings.yAxisShow,
                    type: 'value',
                    name: settings.yAxisName,
                    nameTextStyle: {
                        color: settings.yAxisNameTextStyleColor,
                        fontStyle: settings.yAxisNameTextStyleFontStyle,
                        fontWeight: settings.yAxisNameTextStyleFontWeight,
                        fontFamily: settings.yAxisNameTextStyleFontFamily,
                        fontSize: settings.yAxisNameTextStyleFontSize,
                        align: settings.yAxisNameTextStyleAlign
                    },
                    axisLabel: {
                        //align: 'center',
                        formatter: function (a) {
                            a = +a;
                            return isFinite(a)
                                ? echarts.format.addCommas(+a)
                                : '';
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            type: settings.yAxisLineStyleType,
                            color: settings.yAxisLineStyleColor
                        }
                    }
                },
                /*{
                    type: 'value',
                    name: 'Ось У2',
                    min: 0,
                    max: 1800,
                    position: 'right',
                    axisLine: {
                        lineStyle: {
                            color: 'orange'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} заявок'
                    }
                }*/
            ],
            dataZoom: [
                {
                    show: true,
                    start: 0,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 0,
                    end: 100
                },
                {
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }
            ],
            series: formattedData.series
        };

        chart.setOption(option);
    });
}
