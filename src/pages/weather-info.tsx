import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  makeStyles,
} from '@material-ui/core';
import dayjs from 'dayjs';
import _ from 'lodash';
import React from 'react';

import { BarChart } from 'components';
import { usePagination } from 'hooks';
import { useGetWeathers } from 'services';
import { TemperatureUnits, WeatherInfoType } from 'typings';
import { averageTemperature, convertTemperatureValueByUnit } from 'utils/helpers';

export function WeatherInfo() {
  const classes = useStyles();
  const { data, isLoading } = useGetWeathers();
  const [unit, setUnit] = React.useState<TemperatureUnits>('fahrenheit');
  const [temperatureByDate, setTemperatureByDate] = React.useState<Array<any>>([]);
  const [mapped, setMapped] = React.useState<Array<WeatherInfoType>>();
  const [keyDate, setKeyDate] = React.useState('');
  const [groupedByDate, setGroupedByDate] = React.useState<{ [key: string]: Array<any> }>({});
  const { setPreviousPage, setNextPage, currentData, isNextEnabled, isPreviousEnabled } = usePagination(mapped, 3);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUnit(event.target.value as TemperatureUnits);
  }

  React.useEffect(() => {
    if (data) {
      const groupedByDate: { [key: string]: Array<any> } = _.groupBy(data.list, (d) => new Date(d.dt * 1000).getDate());

      const dateKeys = Object.keys(_.groupBy(data.list, (d) => new Date(d.dt * 1000).getDate()));

      const mapDateToTemperatureInfo = dateKeys.map((item) => ({
        temp: averageTemperature(groupedByDate[item]),
        date: groupedByDate[item][0].dt_txt.split(' ')[0],
        key: item,
      }));

      setGroupedByDate(groupedByDate);
      setMapped(mapDateToTemperatureInfo);
      setTemperatureByDate(groupedByDate[dateKeys[0]]);
    }
  }, [data]);

  const chartData = (groupedByDate[keyDate] || temperatureByDate).map((item: any) =>
    convertTemperatureValueByUnit(item.main.temp, unit)
  );

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <div className={classes.loaderContainer}>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <>
          <FormControl component="fieldset" className={classes.form}>
            <RadioGroup
              className={classes.radio}
              row
              aria-label="temperature"
              name="temperature"
              value={unit}
              onChange={handleChange}
            >
              <FormControlLabel value="celsius" control={<Radio />} label="Celsius" labelPlacement="top" />
              <FormControlLabel value="fahrenheit" control={<Radio />} label="Fahrenheit" labelPlacement="top" />
            </RadioGroup>
          </FormControl>

          <div className="paginate-arrow">
            <div>
              {isPreviousEnabled ? (
                <Button size="small" onClick={setPreviousPage}>
                  <span className="material-icons">arrow_back</span>
                </Button>
              ) : null}
            </div>

            <div>
              {isNextEnabled ? (
                <Button size="small" onClick={setNextPage}>
                  <span className="material-icons">arrow_forward</span>
                </Button>
              ) : null}
            </div>
          </div>

          <Grid container spacing={3} justify="center" wrap="wrap">
            {(currentData || []).map((item) => (
              <Grid item key={item.key}>
                <Card className={classes.card} onClick={() => setKeyDate(item.key)}>
                  <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Temp
                    </Typography>
                    <Typography component="p">{item.temp}</Typography>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Date
                    </Typography>
                    <Typography component="p">{dayjs(item.date).format('D MMM YY')}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.chartContainer}>
            <BarChart data={chartData} />
          </div>
        </>
      )}
    </Container>
  );
}

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    cursor: 'pointer',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
  },
  radio: {
    justifyContent: 'center',
  },
  form: {
    width: '100%',
    marginTop: 50,
    marginBottom: 50,
  },
  loaderContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    marginTop: 50,
  },
});
