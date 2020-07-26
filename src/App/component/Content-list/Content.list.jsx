import React from 'react'
import ContentCard from '../Content-card/Content.card'
const ContentList = (props) => {
    return (
        <div>
            {props.contents.map((content, index) =>
                <ContentCard content={content} key={index} />
            )}

        </div>
    )
}

export default ContentList