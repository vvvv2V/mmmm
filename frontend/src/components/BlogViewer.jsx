import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BlogViewer.css';

const BlogViewer = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      if (searchQuery.trim()) {
        // Buscar posts
        const res = await axios.get(`/api/blog/search?query=${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPosts(res.data.results || []);
        setCurrentPage(1);
      } else {
        // Listar posts com paginação
        const res = await axios.get(
          `/api/blog?page=${currentPage}&limit=10`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPosts(res.data.posts || []);
        setTotalPages(Math.ceil(res.data.total / 10) || 1);
      }
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPosts();
  };

  const handlePostClick = async (slug) => {
    try {
      const res = await axios.get(`/api/blog/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedPost(res.data.post);
    } catch (error) {
      console.error('Erro ao carregar post:', error);
    }
  };

  if (selectedPost) {
    return (
      <div className="blog-post-view">
        <button className="back-btn" onClick={() => setSelectedPost(null)}>
          ← Voltar
        </button>

        <article className="blog-post">
          <h1>{selectedPost.title}</h1>
          <div className="post-meta">
            <span className="post-date">
              📅 {new Date(selectedPost.created_at).toLocaleDateString('pt-BR')}
            </span>
            <span className="post-views">👁️ {selectedPost.views} visualizações</span>
          </div>

          {selectedPost.keywords && (
            <div className="post-keywords">
              {selectedPost.keywords.split(',').map((keyword) => (
                <span key={keyword.trim()} className="keyword">
                  #{keyword.trim()}
                </span>
              ))}
            </div>
          )}

          <div className="post-content">
            {selectedPost.content.split('\n').map((paragraph, idx) => (
              paragraph.trim() && <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="blog-viewer">
      <h2>📝 Blog & Artigos</h2>

      <form onSubmit={handleSearch} className="blog-search">
        <input
          type="text"
          placeholder="Buscar artigos por palavra-chave..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          🔍 Buscar
        </button>
      </form>

      {loading ? (
        <div className="blog-loading">Carregando artigos...</div>
      ) : posts.length === 0 ? (
        <div className="no-posts">
          <p>Nenhum artigo encontrado</p>
        </div>
      ) : (
        <>
          <div className="blog-posts-list">
            {posts.map((post) => (
              <div
                key={post.id}
                className="blog-post-card"
                onClick={() => handlePostClick(post.slug)}
              >
                <h3>{post.title}</h3>
                <p className="post-excerpt">
                  {post.excerpt || post.content?.substring(0, 150)}...
                </p>
                <div className="post-card-meta">
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </span>
                  <span className="post-views">{post.views} views</span>
                </div>
                <button className="read-more-btn">Ler Artigo →</button>
              </div>
            ))}
          </div>

          {!searchQuery && (
            <div className="blog-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="pagination-btn"
              >
                ← Anterior
              </button>
              <span className="page-info">
                Página {currentPage} de {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="pagination-btn"
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogViewer;
