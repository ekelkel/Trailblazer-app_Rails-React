import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const classes = useStyles();
  const StyledRating = withStyles({
    iconFilled: {
      color: "#FFBC1F",
    },
    icon: {},
  })(Rating);

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.pin.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.pin.address}
        </Typography>
        <Typography variant="body2" component="p">
          {props.pin.comment}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        {props.pin.rating ? (
          <StyledRating
            className="pop-score-hearts"
            value={props.pin.rating}
            precision={0.1}
            icon={<FavoriteIcon fontSize="inherit" />}
            readOnly
          />
        ) : (
          <div />
        )}
      </CardActions>
    </Card>
  );
}
