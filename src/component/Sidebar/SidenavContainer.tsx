import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

interface SidenavContainerProps{
    children: ReactNode;
    sidenav: ReactElement;
}
function SidenavContainer({ children, sidenav} : SidenavContainerProps) {
    return (
        <Grid templateColumns='auto' >
            <GridItem>
                <Box>
                    {sidenav}
                </Box>
            </GridItem>
            <GridItem>
                {children}
            </GridItem>
        </Grid>
    )
}

export default SidenavContainer;