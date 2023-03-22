import { useState } from 'react'

import {
    Container,
    Fade,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListSubheader,
    Skeleton,
} from '@mui/material'

const GroupIcon = ({ groupData, isScanned }) => {

    const [loadingComplete, setLoadingComplete] = useState(new Array(groupData.length).fill(false))

    return (
        <Container>
            <ImageList>
                <ImageListItem key="Subheader" cols={3}>
                    <ListSubheader component="div">集章欄</ListSubheader>
                </ImageListItem>
                {groupData.map((item, index) => (
                    <ImageListItem
                        key={index}
                        sx={{
                            width: 100,
                            marginTop: 5
                        }}
                    >
                        {isScanned[index] &&
                            <Fade in={isScanned[index]}>
                                <img
                                    src='./img/common/ok.png'
                                    alt='Ok蹦'
                                    loading='lazy'
                                    style={{
                                        position: 'absolute',
                                        width: '100%',
                                        zIndex: 1001,
                                    }}
                                    onLoad={() => {
                                        setLoadingComplete(new Array(groupData.length).fill(true))
                                    }}
                                />
                            </Fade>
                        }
                        <img
                            src={item.img}
                            alt={item.title}
                            style={{ display: 'none' }}
                            onLoad={() => {
                                let tempLoad = loadingComplete
                                tempLoad[index] = true
                                setLoadingComplete(tempLoad)
                            }}
                        />
                        {

                            loadingComplete[index] ?
                                (<img
                                    src={item.img}
                                    alt={item.title}
                                />)
                                :
                                (<Skeleton variant="circular" width={'100%'} height={100} />)
                        }

                        <ImageListItemBar
                            title={item.title}
                            subtitle={item.author}
                            position="below"
                            sx={{
                                bottom: '-10',
                                color: '#58595b',
                                borderBottom: '1px solid #58595b'
                            }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}

export default GroupIcon