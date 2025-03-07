package br.unifor.category.repository;

import br.unifor.category.model.Category;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class CategoryRepository {
    private final List<Category> categories = new ArrayList<>();
    private Long nextId = 1L;

    public List<Category> findAll(){
        return categories;
    }

    public Optional<Category> findById(Long id){
        return categories.stream().filter(c -> c.getId().equals(id)).findFirst();
    }

    public Category save(Category category){
        category.setId(nextId++);
        categories.add(category);
        return category;
    }

    public Category update(Category category){
        return categories.stream()
                .filter(p -> p.getId().equals(category.getId()))
                .findFirst()
                .map(c -> {
                    c.setName(category.getName());
                    c.setDescription(category.getDescription());
                    return c;
                })
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada para atualização"));
    }

    public void deleteById(Long id){
        categories.removeIf(c -> c.getId().equals(id));
    }

}