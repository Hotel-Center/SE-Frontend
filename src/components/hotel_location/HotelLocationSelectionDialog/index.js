import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import NeshanMap from "@neshan-maps-platform/react-openlayers";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function HotelLocationSelectionDialog(props) {
  const [center, setCenter] = useState({
    latitude: null,
    longitude: null,
  });
  const { open, setOpen, onChange, value } = props;

  const olMapRef = useRef(null);
  const [ol, setOl] = useState(null);
  const markerRef = useRef(null);
  const startPointRef = useRef(null);

  const handleSave = () => {
    onChange(center);
    handleClose();
  };

  const onInit = (ol, map) => {
    setCenter(value);
    olMapRef.current = map;
    setOl(ol);

    const marker = new ol.Feature({
      geometry: new ol.geom.Point(
        ol.proj.fromLonLat([
          value.longitude || 51.338076,
          value.latitude || 35.699756,
        ])
      ),
    });

    const layer = new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [marker],
      }),
      style: new ol.style.Style({
        image: new ol.style.Icon({
          color: "#BADA55",
          crossOrigin: "anonymous",
          src: "/img/location.svg",
        }),
      }),
    });

    const handleMapDragStart = (event) => {
      if (ol !== null) {
        const map = olMapRef.current;
        const pixel = map.getEventPixel(event);
        startPointRef.current = [...pixel];
      }
    };

    const handleMapDragEnd = (event) => {
      if (ol !== null) {
        const map = olMapRef.current;
        const pixel = map.getEventPixel(event);
        const startPoint = startPointRef.current;
        const distance = Math.sqrt(
          Math.pow(pixel[0] - startPoint[0], 2) +
          Math.pow(pixel[1] - startPoint[1], 2)
        );

        if (distance < 1) {
          const marker = markerRef.current;
          const coordinates = map.getCoordinateFromPixel(pixel);
          const [longitude, latitude] = ol.proj.toLonLat(coordinates);
          setCenter({ longitude, latitude });
          marker.setGeometry(new ol.geom.Point(coordinates));
        }
      }
    };

    markerRef.current = marker;
    map.addLayer(layer);

    map.getViewport().addEventListener("pointerdown", handleMapDragStart);
    map.getViewport().addEventListener("pointerup", handleMapDragEnd);
  };
  useEffect(() => {
    if (center.longitude === null || center.latitude === null) {
      setCenter({ longitude: 35.7665394, latitude: 51.4749824 });
    } else if (olMapRef.current !== null && markerRef.current !== null) {
      const marker = markerRef.current;
      const coordinates = ol.proj.fromLonLat([
        center.longitude,
        center.latitude,
      ]);
      marker.setGeometry(new ol.geom.Point(coordinates));
    }
  }, [center, olMapRef.current]);

  const handleClose = () => {
    setOpen(false);
    startPointRef.current = null;
  };
  return (
    <Dialog
      open={open}
      onAbort={handleClose}
      onClose={handleClose}
      maxWidth="lg"
    >
      <DialogTitle>Select hotel location</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            height: "80vh",
          }}
        >
          <NeshanMap
            mapKey="web.ec47b949ed89449085f47042eb04a8a6"
            serviceKey="service.cefc55fca88945e298665cd1f6230315"
            center={{
              latitude: value.latitude || 35.699756,
              longitude: value.longitude || 51.338076,
            }}
            onInit={onInit}
            zoom={14}
          ></NeshanMap>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={center.latitude === null || center.longitude === null}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
