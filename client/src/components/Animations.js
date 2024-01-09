import { Box, Skeleton } from "@mui/material";

const Animations = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Skeleton animation="pulse" height={60} />
            <Skeleton animation="pulse" height={50} />
            <Skeleton animation="pulse" height={50} />
            <Skeleton animation="pulse" height={50} />
            <Skeleton animation="pulse" height={50} />
            <Skeleton animation="pulse" height={50} />
            <Skeleton animation="pulse" height={50} />
            <Skeleton animation="pulse" height={50} />
        </Box>
    );
};
export default Animations;