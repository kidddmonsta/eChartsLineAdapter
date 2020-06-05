function formatData() {

        //todo заполнять легенду названиями серий
        let legendDataNames = [];
        let series = [];
        let xAxis = [];
        var seriesDataValues = [];



        //Формируем массив Иксов и Значений серий
        filteredData.forEach(function (seria, index) {
            if (settings.customDimension == null) {
                console.log(settings.timeDimensionGranularity);
                switch (seria[settings.timeDimensionGranularity]) {
                    case "day":
                        xAxis[index] = moment(seria[settings.timeDimension]).format("YYYY-MM-DD");
                        break;
                    case "month":
                        xAxis[index] = moment(seria[settings.timeDimension]).format("YYYY-MM");
                        break;
                    case "year":
                        xAxis[index] = moment(seria[settings.timeDimension]).format("YYYY");
                        break;
                    default:
                        xAxis[index] = seria[settings.timeDimension];
                        break;
                }
            } else {
                xAxis[index] = seria[settings.customDimension];
            }
            settings.series.forEach(function (value, ind) {
                if (typeof seriesDataValues[value] == 'undefined') {
                    seriesDataValues[value] = [];
                }
                seriesDataValues[value][index] = seria[value];
            });
        });

        //Формируем серии для компонента графика @todo нужно брать имена на русском они в объекте data tableColumns есть
        settings.series.forEach(function (value, ind) {
            series[ind] = {
                name: value,
                data: seriesDataValues[value],
                type: 'line',
                symbol: settings.seriesSymbol,
                symbolSize: settings.seriesSymbolSize,
                lineStyle: {
                    type: settings.seriesLineStyleType
                }
            };
            legendDataNames[ind] = value;
        });
        var returnData = {
            legendDataNames: legendDataNames,
            series: series,
            xAxis: xAxis,
            unformatteData: filteredData
            //unformatteData: unformatteData
        };
        console.log(returnData);
        return returnData;
    }

