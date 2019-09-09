

export const USER_FRAGMENT = `
        id
        username

`;


export const COMMENT_FRAGMENT = `
        id 
        text
        user {
            ${USER_FRAGMENT}
         }
`;

export const FILE_FRAGMENT = `
        id
        url
    
`;

export const FULL_POST_FRAGEMNT = `
    fragment PostParts on Post{
        id
        captions
        location
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`