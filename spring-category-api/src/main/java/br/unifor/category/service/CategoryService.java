package br.unifor.category.service;

import br.unifor.category.dto.CategoryDTO;
import br.unifor.category.model.Category;
import br.unifor.category.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDTO> findAll() {
        return categoryRepository.findAll().stream()
                .map(c -> new CategoryDTO(c.getId(), c.getName(), c.getDescription()))
                .collect(Collectors.toList());
    }

    public CategoryDTO findById(Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria inexistente"));
        return new CategoryDTO(category.getId(), category.getName(), category.getDescription());
    }

    public CategoryDTO save(CategoryDTO categoryDTO) {
        Category novoCategory = new Category(null, categoryDTO.getName(), categoryDTO.getDescription());
        Category categorySalvo = categoryRepository.save(novoCategory);
        return new CategoryDTO(categorySalvo.getId(), categorySalvo.getName(), categorySalvo.getDescription());
    }

    public CategoryDTO update(Long id, CategoryDTO categoryDTO) {
        Category categoryExiste = categoryRepository.findById(id).orElseThrow(() -> new RuntimeException("Categoria inexistente"));
        categoryExiste.setName(categoryDTO.getName());
        categoryExiste.setDescription(categoryDTO.getDescription());
        Category categorySalvo = categoryRepository.update(categoryExiste);
        return new CategoryDTO(categorySalvo.getId(), categorySalvo.getName(), categorySalvo.getDescription());
    }

    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }
}
