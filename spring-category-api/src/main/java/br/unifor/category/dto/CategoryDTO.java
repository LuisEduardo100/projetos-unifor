package br.unifor.category.dto;

import jakarta.validation.constraints.NotBlank;

public class CategoryDTO {
    private Long id;
    private String name;
    private String description;

    public CategoryDTO() {}

    public CategoryDTO(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public CategoryDTO(Long id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }


}
