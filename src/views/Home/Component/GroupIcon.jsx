import Container from '@mui/material/Container'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ListSubheader from '@mui/material/ListSubheader'

const GroupIcon = ({ groupData }) => {
    return (
        <Container>
            <ImageList>
                <ImageListItem key="Subheader" cols={3}>
                    <ListSubheader component="div">進度</ListSubheader>
                </ImageListItem>
                {groupData.map((item, index) => (
                    <ImageListItem
                        key={index}
                        sx={{
                            width: 100,
                        }}
                    >
                        {/* <img
                            src='./img/common/ok.png'
                            alt='Ok蹦'
                            loading='lazy'
                            style={{
                                position: 'absolute',
                                width: '100%',
                                zIndex: 1001,
                            }}
                        /> */}
                        <img
                            src={item.img}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            sx={{
                                borderRadius: '10px',
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}

export default GroupIcon