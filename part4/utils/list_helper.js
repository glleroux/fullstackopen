const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return !blogs.length ? 0 : blogs.map(i=>i.likes).reduce((a,b)=>a+b);
} 

const favouriteBlog = (blogs) => {
    const favourite = blogs.find(x => x.likes === Math.max(...blogs.map(i=>i.likes)))
    return {
        title: favourite.title,
        author: favourite.author,
        likes: favourite.likes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}