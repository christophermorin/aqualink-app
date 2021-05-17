import React from "react";
import {
  Grid,
  Box,
  Typography,
  withStyles,
  WithStyles,
  createStyles,
  Button,
  useTheme,
  useMediaQuery,
  Tooltip,
  Theme,
} from "@material-ui/core";
import grey from "@material-ui/core/colors/grey";
import { Alert } from "@material-ui/lab";
import { RangeButton, RangeValue } from "./types";
import { Sources, TimeSeriesDataRange } from "../../../store/Reefs/types";
import { availableRangeString } from "./helpers";

const ViewRange = ({
  range,
  disableMaxRange,
  title,
  onRangeChange,
  classes,
  timeSeriesDataRanges,
  timeZone,
}: ViewRangeProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const allSensors: { id: Sources; name: string }[] = [
    { id: "hobo", name: "HOBO" },
    { id: "spotter", name: "Spotter" },
  ];

  const buttons: RangeButton[] = [
    {
      id: "three_months",
      title: "3 Months",
      tooltip: "Range of 3 months from maximum date",
    },
    {
      id: "one_year",
      title: "1 Year",
      tooltip: "Range of 1 year from maximum date",
    },
    {
      id: "max",
      title: "Max",
      disabled: disableMaxRange,
      tooltip: disableMaxRange ? "No maximum range" : "Maximun range",
    },
    {
      id: "custom",
      title: "Custom",
      tooltip: "Custom range",
    },
  ];

  return (
    <>
      <Grid
        className={classes.autoWidth}
        container
        alignItems="flex-end"
        justify="space-between"
        spacing={2}
      >
        <Grid item>
          <Box ml="42px">
            <Typography variant="h6" color="textSecondary">
              {title || "TEMPERATURE"}
            </Typography>
            {timeSeriesDataRanges && (
              <Grid
                className={classes.rangesWrapper}
                container
                alignItems="center"
                spacing={2}
              >
                {allSensors.map((sensor) => {
                  const dateRangeString = availableRangeString(
                    sensor.name,
                    timeSeriesDataRanges[sensor.id]?.bottomTemperature?.[0],
                    timeZone
                  );

                  if (!dateRangeString) {
                    return null;
                  }

                  return (
                    <Grid key={sensor.id} item>
                      <Alert
                        classes={{
                          icon: classes.rangeIcon,
                          root: classes.rangeItem,
                        }}
                        severity="info"
                      >
                        <Typography variant="subtitle2">
                          {dateRangeString}
                        </Typography>
                      </Alert>
                    </Grid>
                  );
                })}
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={isMobile ? 12 : undefined}>
          <Box ml="32px">
            <Grid
              className={classes.autoWidth}
              container
              justify={isMobile ? "center" : "flex-start"}
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={isMobile ? 12 : undefined}>
                <Typography variant="subtitle1" color="textSecondary">
                  View Range:
                </Typography>
              </Grid>
              {buttons.map((button) => (
                <Grid key={button.id} item xs={isMobile ? 12 : undefined}>
                  <Tooltip arrow placement="top" title={button.tooltip}>
                    <div>
                      <Button
                        onClick={() => onRangeChange(button.id)}
                        size="small"
                        variant={range === button.id ? "contained" : "outlined"}
                        color="primary"
                        disabled={button.disabled}
                        fullWidth
                      >
                        <Typography variant="subtitle1">
                          {button.title}
                        </Typography>
                      </Button>
                    </div>
                  </Tooltip>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    autoWidth: {
      width: "auto",
    },
    rangesWrapper: {
      marginTop: 0,
    },
    rangeItem: {
      height: 28,
      display: "flex",
      alignItems: "center",
      backgroundColor: grey[100],
      color: grey[600],
      borderRadius: 5,
      padding: "2px 5px",
    },
    rangeIcon: {
      color: "inherit !important",
      fontSize: theme.spacing(2),
      marginRight: 5,
    },
  });

interface ViewRangeIncomingProps {
  range: RangeValue;
  disableMaxRange: boolean;
  title?: string;
  onRangeChange: (value: RangeValue) => void;
  timeSeriesDataRanges: TimeSeriesDataRange | undefined;
  timeZone?: string | null;
}

ViewRange.defaultProps = {
  title: "",
  timeZone: null,
};

type ViewRangeProps = ViewRangeIncomingProps & WithStyles<typeof styles>;

export default withStyles(styles)(ViewRange);
